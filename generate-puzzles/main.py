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
from chesscoven.puzzles.checkscaptures import generate_checks_captures
from chesscoven.puzzles.undefended import generate_undefended
from chesscoven.puzzles.counting import generate_counting, prune_counting
from chesscoven.puzzles.knightforkables import generate_knight_forkable

from chesscoven.pipeline import \
    run_pipeline, from_self, from_positions, from_games, passthrough, \
    build_pruner

from chesscoven.common import \
    get_lichess_games, games_reader, count_pieces


def load_puzzle_names():
    return list(load_manifest()["puzzles"].keys())


def load_manifest(build_dir=None, assets_dir=None):
    paths = {}

    if build_dir is not None:
        build_dir = pathlib.Path(build_dir)
        paths |= {
            "source_games_path": build_dir / "games.pgn",
            "source_positions_path": build_dir / "positions.json",
        }

    if assets_dir is not None:
        assets_dir = pathlib.Path(assets_dir)
        paths |= {
            "assets_dir": assets_dir,
            "puzzles_dir": assets_dir / "puzzles",
        }

    return {
        "paths": paths,
        "puzzles": {
            "knight-forks": {
                "load": from_self,
                "generate_puzzles": generate_knight_forkable,
                "prune": passthrough
            },
            "counting": {
                "load": from_games,
                "generate_puzzles": generate_counting,
                "prune": prune_counting,
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
                "Noobmasterplayer123",
                "Benwick",
            ]
        }
    }


@click.group()
def cli():
    pass


@cli.command(name="generate")
@click.argument("puzzle_name", type=click.Choice(load_puzzle_names()))
@click.argument("assets_dir", type=click.Path())
@click.option("--build-dir", "build_dir", default="build", type=click.Path())
def cli_generate(puzzle_name, build_dir, assets_dir):
    manifest = load_manifest(build_dir, assets_dir)

    run_pipeline(puzzle_name, manifest, True)


@cli.command(name="all")
@click.argument("assets_dir", type=click.Path())
@click.option("--build-dir", "build_dir", default="build", type=click.Path())
@click.option("--refetch", "should_refetch", is_flag=True, default=False)
@click.option("--overwrite-assets", "should_overwrite_assets", is_flag=True, default=False)
@click.option("--build-dir", "build_dir", default="build", type=click.Path())
def cli_all(build_dir, assets_dir, should_refetch, should_overwrite_assets):
    manifest = load_manifest(build_dir, assets_dir)

    os.makedirs(build_dir, exist_ok=True)

    pgn_path = manifest["paths"]["source_games_path"]
    positions_path = manifest["paths"]["source_positions_path"]

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

    for puzzle_name in manifest["puzzles"]:
        run_pipeline(puzzle_name, manifest, should_overwrite_assets)


def cli_fetch_games(pgn_path, manifest):
    logging.info("Retreiving and storing source games from lichess")
    if os.path.exists(pgn_path):
        os.remove(pgn_path)

    usernames = manifest["sources"]["lichess_usernames"]
    for pgn in tqdm(get_lichess_games(usernames), total=len(usernames)):
        with open(pgn_path, "ab") as file:
            file.write(pgn)


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


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    cli()
