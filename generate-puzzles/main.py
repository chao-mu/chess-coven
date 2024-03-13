#!/usr/bin/env python

# Core
import json
import logging
import os
import pathlib

# CLICK
import click

# Chess
import chess
import chess.pgn

# Pandas
import pandas as pd

# TQDM
from tqdm import tqdm

# Ours
from chesscoven.games.checkscaptures import generate_checks_captures
from chesscoven.games.undefended import generate_undefended
from chesscoven.games.counting import generate_counting
from chesscoven.games.knightforkables import generate_knight_forkable
from chesscoven.common import get_lichess_games, games_reader, get_site, count_pieces, Puzzle


def load_manifest():
    return {
        "games": {
            "knight-forks": {
                "load": from_self,
                "generate_puzzles": generate_knight_forkable,
                "prune": passthrough
            },
            "counting": {
                "load": from_games,
                "generate_puzzles": generate_counting,
                "prune": passthrough,
            },
            "checks-captures": {
                "load": from_positions,
                "generate_puzzles": generate_checks_captures,
                "prune": build_pruner(),
            },
            "undefended": {
                "load": from_positions,
                "generate_puzzles": generate_undefended,
                "prune": build_pruner(),
            },
        },
        "sources": {
            "lichess_usernames": [
                "bestieboots",
                "Chess4Coffee",
                "Cause_Complications",
                "NoseKnowsAll",
                "Bubbleboy",
                "WoodJRx",
            ]
        }
    }


@click.group()
def cli():
    pass


@cli.command(name="all")
@click.argument("assets_dir", type=click.Path())
@click.option("--refetch", "should_refetch", is_flag=True, default=False)
@click.option("--overwrite-assets", "should_overwrite_assets", is_flag=True, default=False)
@click.option("--build-dir", "build_dir", default="build", type=click.Path())
def cli_all(build_dir, assets_dir, should_refetch, should_overwrite_assets):
    build_dir = pathlib.Path(build_dir)
    assets_dir = pathlib.Path(assets_dir)
    puzzles_dir = assets_dir / "puzzles"

    manifest = load_manifest()

    os.makedirs(build_dir, exist_ok=True)

    pgn_path = build_dir / "games.pgn"
    positions_path = build_dir / "positions.json"

    if should_refetch or not pgn_path.exists():
        cli_fetch_games(pgn_path, manifest)
    else:
        logging.info(
            f"Skipping re-genearting {pgn_path}. Use --refetch to force.")

    if should_refetch or not positions_path.exists():
        cli_extract_positions(pgn_path, positions_path)
    else:
        logging.info(
            f"Skipping re-genearting {positions_path}. Use --refetch to force.")

    for name, game_manifest in manifest["games"].items():
        out_path = puzzles_dir / (name + ".json")
        if out_path.exists() and not should_overwrite_assets:
            logging.info(
                f"Skipping re-genearting {out_path}. Use --overwrite-assets to force.")
            continue

        logging.info(f"### Processing {name}")
        cli_generate_puzzles(pgn_path, positions_path, out_path, game_manifest)


def cli_fetch_games(pgn_path, manifest):
    logging.info("Retreiving and storing source games from lichess")
    if os.path.exists(pgn_path):
        os.remove(pgn_path)

    usernames = manifest["sources"]["lichess_usernames"]
    for pgn in tqdm(get_lichess_games(usernames), total=len(usernames)):
        with open(pgn_path, "ab") as file:
            file.write(pgn)


def cli_generate_puzzles(pgn_path, positions_path, out_path, game_manifest):
    load = game_manifest["load"]
    generate_puzzles = game_manifest["generate_puzzles"]
    prune = game_manifest["prune"]

    puzzles = load(
        pgn_path=pgn_path,
        positions_path=positions_path,
        generate_puzzles=generate_puzzles
    )

    if not puzzles:
        logging.warning(
            f"Zero candidate puzzles generated! Skipping {out_path}")
        return
    else:
        logging.info(f"Generated {len(puzzles)} candidate puzzles")

    df = to_df(puzzles)
    df = prune(df)
    df.to_json(out_path, orient="records")

    logging.info(f"Wrote {len(df)} puzzles to {out_path}")


def cli_extract_positions(pgn_path, positions_path):
    logging.info("Extracting and storing positions from source games")
    positions = []
    for game in tqdm(games_reader(pgn_path)):
        board = game.board()
        for idx, move in enumerate(game.mainline_moves()):
            board.push(move)
            if board.is_game_over():
                continue

            fen = board.fen()
            if "[" in fen:
                break

            move_number = idx + 1
            positions.append({
                "fen": board.fen(),
                "moveNumber": move_number,
                "pieceCount": count_pieces(board=board),
                "site": f"{game.headers['Site']}#{move_number}",
            })

    df = pd.DataFrame(positions)
    df.drop_duplicates(subset=["fen"], inplace=True)
    df.to_json(positions_path, orient="records", lines=True)


def build_pruner(
    min_piece_count=4,
    max_piece_count=24,
    max_solution_count=4,
    min_solution_count=1,
    min_piece_per_solution=2,
    max_piece_per_solution=12
):
    def prune(df):
        df = df[
            (df["solutionCount"] <= max_solution_count) &
            (df["solutionCount"] >= min_solution_count) &
            (df["pieceCount"] >= min_piece_count) &
            (df["pieceCount"] <= max_piece_count) &
            (df["pieceCount"] / df["solutionCount"] >= min_piece_per_solution) &
            (df["pieceCount"] / df["solutionCount"] <= max_piece_per_solution)
        ]

        def is_worthy(fens):
            board = chess.Board(fens[0])
            return not board.is_game_over() and board.is_valid()

        df = df[df["fens"].apply(is_worthy)]

        logging.info(f'Found {len(df)} interesting puzzles')

        df = df.sample(min(len(df), 2000))

        return df

    return prune


@cli.command(name="memorizer")
@click.argument('pgn_path', type=click.Path(exists=True))
def cli_memorizer(pgn_path):
    game = chess.pgn.read_game(open(pgn_path))
    if not game:
        return
    out = []
    board = game.board()
    for move in game.mainline_moves():
        fen = board.fen()
        out.append({
            "fen": fen,
            "solution": move.uci(),
        })
        board.push(move)
    out.append({"fen": board.fen(), "solution": ""})

    print(json.dumps(out))


@cli.command(name="opening-tree")
@click.argument('openings_path', type=click.Path(exists=True))
@click.argument('out_path', default="assets/opening-tree.json", type=click.Path())
def cli_opening_tree(openings_path, out_path):
    df = pd.read_csv(openings_path, sep="\t")
    tree = {}
    opening_names = {}
    for uci, name in zip(df["uci"], df["name"]):
        continuations = tree
        for move in uci.split():
            if move not in continuations:
                continuations[move] = {}
            continuations = continuations[move]

        if uci in opening_names:
            logging.warn("Duplicate opening name!")

        opening_names[uci] = name

    out = {
        "tree": tree,
        "names": opening_names,
    }

    with open(out_path, "w") as f:
        json.dump(out, f)


def from_positions(positions_path, generate_puzzles, **kv):
    reader = pd.read_json(positions_path, chunksize=1000, lines=True)

    puzzles = []
    for df in tqdm(reader):
        for fen, site in zip(df["fen"], df["site"]):
            for puzzle in generate_puzzles(fen):
                if not puzzle.site:
                    puzzle.site = site
                if not puzzle.fens:
                    puzzle.fens = [fen]

                puzzles.append(puzzle)

    return puzzles


def from_games(pgn_path, generate_puzzles, **kv):
    games = []
    with open(pgn_path) as f:
        while True:
            game = chess.pgn.read_game(f)
            if game is None:
                break  # end of file

            games.append(game)

    puzzles = []
    for game in tqdm(games):
        for puzzle in generate_puzzles(game):
            if puzzle.game_move_number and not puzzle.site:
                puzzle.site = get_site(game, puzzle.game_move_number)

            puzzles.append(puzzle)

    return puzzles


def from_self(generate_puzzles, **kv):
    return generate_puzzles()


def passthrough(df):
    return df


def to_df(puzzles):
    df = pd.DataFrame(
        {
            "highlights": [p.highlights for p in puzzles],
            "solutionAliases": [p.solution_aliases for p in puzzles],
            "site": [p.site for p in puzzles],
            "solutions": [p.solutions for p in puzzles],
            "solutionCount": [len(p.solutions) for p in puzzles],
            "pieceCount": [count_pieces(fen=p.fens[0]) for p in puzzles],
            "fens": [p.fens for p in puzzles],
        }
    )

    return df


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    cli()
