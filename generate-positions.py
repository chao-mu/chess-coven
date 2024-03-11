#!/usr/bin/env python

# Core
import json
import itertools
import random
import logging
import os
import requests
from dataclasses import dataclass, field, asdict

# CLICK
import click

# Chess
import chess
import chess.pgn

# Pandas
import pandas as pd

# TQDM
from tqdm import tqdm

PIECE_VALUES = {
    chess.PAWN: 1,
    chess.KNIGHT: 3,
    chess.BISHOP: 3,
    chess.ROOK: 5,
    chess.QUEEN: 9,
}

@click.group()
def cli():
    pass

COLORS = [chess.WHITE, chess.BLACK]
PIECES = [chess.PAWN, chess.KNIGHT, chess.BISHOP, chess.ROOK, chess.QUEEN]

@cli.command(name='write-games')
@click.argument('out_path', type=click.Path())
def cli_write_games(out_path):
    # Remove the existing file if it exists.
    # We will be appending to it as we go.
    if os.path.exists(out_path):
        os.remove(out_path)

    # List of Lichess usernames to scrape
    usernames = [
        "bestieboots",
        "Chess4Coffee",
        "Cause_Complications",
        "NoseKnowsAll",
        "Bubbleboy",
        "WoodJRx",
    ]

    # Scrape games for each user
    for username in usernames:
        max_results = 200
        url = f"https://lichess.org/api/games/user/{username}?max={max_results}&evals=false&perfType=classical,rapid"

        # Make a GET request to the URL
        response = requests.get(url)

        # Append the response content to the games file
        with open(out_path, "ab") as file:
            file.write(response.content)

@cli.command(name='write-puzzles')
@click.argument('positions_path', type=click.Path(exists=True))
@click.argument('out_path', type=click.Path())
@click.option('--min-piece-count', default=4)
@click.option('--max-piece-count', default=24)
@click.option('--max-solution-count', default=4)
@click.option('--min-solution-count', default=1)
@click.option('--min-piece-per-solution', default=2)
@click.option('--max-piece-per-solution', default=12)
def cli_write_puzzles(positions_path, out_path, min_piece_count, max_piece_count, min_solution_count, max_solution_count, min_piece_per_solution, max_piece_per_solution):
    df = pd.read_json(positions_path, lines=True)
    logging.info(f'Weeding {len(df)} puzzles')

    df["solutionCount"] = df["solutions"].map(len)
    df = df[
        (df["solutionCount"] <= max_solution_count) &
        (df["solutionCount"] >= min_solution_count) &
        (df["pieceCount"] >= min_piece_count) &
        (df["pieceCount"] <= max_piece_count) &
        (df["pieceCount"] / df["solutionCount"] >= min_piece_per_solution) &
        (df["pieceCount"] / df["solutionCount"] <= max_piece_per_solution)
    ][["fen", "solutions", "site"]]

    def is_worthy(fen):
        board = chess.Board(fen)
        return not board.is_game_over() and board.is_valid()

    df = df[df["fen"].apply(is_worthy)]

    logging.info(f'Found {len(df)} interesting puzzles')

    df = df.sample(min(len(df), 2000))

    df.to_json(out_path, orient="records")

@cli.command(name="write-positions")
@click.argument('pgn_path', type=click.Path(exists=True))
@click.argument('out_path', type=click.Path())
def cli_write_positions(pgn_path, out_path):
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
                "pieceCount": len(board.piece_map()),
                "site": f"{game.headers['Site']}#{move_number}",
            })

    df = pd.DataFrame(positions)
    df.drop_duplicates(subset=["fen"], inplace=True)
    df.to_json(out_path, orient="records", lines=True)

@cli.command(name="knight-forkables")
@click.argument('out_path', type=click.Path())
def cli_knight_forkables(out_path):
    puzzles = []

    pieces = [
        chess.Piece(chess.KING, chess.WHITE),
        chess.Piece(chess.QUEEN, chess.WHITE),
        chess.Piece(chess.ROOK, chess.WHITE),
    ]

    puzzle_sets = []
    for n in range(2, len(pieces) + 1):
        forks, no_solutions = get_knight_forks(pieces[0:n])
        no_solutions = list(random.sample(no_solutions, len(forks)))

        puzzle_sets.append(forks)
        puzzle_sets.append(no_solutions)

    max_size = min(len(ps) for ps in puzzle_sets)
    puzzles = []
    for puzzle_set in puzzle_sets:
        puzzles += random.sample(puzzle_set, max_size)

    with open(out_path, "w") as f:
        json.dump(puzzles, f)

@cli.command(name='checks-captures')
@click.argument('positions_path', type=click.Path(exists=True))
@click.argument('out_path', type=click.Path())
def cli_checks_captures(positions_path, out_path):
    def get_solutions(fen):
        board = chess.Board(fen)

        # Skip positions where there's an active check
        if board.is_check():
            return None

        solutions = {}
        for turn_color in chess.COLORS:
            board.turn = turn_color
            for continuation in board.legal_moves:
                if not (board.is_capture(continuation) or board.gives_check(continuation)):
                    continue

                if board.is_en_passant(continuation):
                    continue

                square_pair = chess.square_name(continuation.from_square) + chess.square_name(continuation.to_square)
                solutions[square_pair] = board.san(continuation) or continuation

        if not solutions:
            return None

        return solutions

    process_positions(positions_path, out_path, get_solutions)

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

@cli.command(name="counting")
@click.argument('games_path', type=click.Path(exists=True))
@click.argument('out_path', default="assets/puzzles/counting.json", type=click.Path())
def cli_counting(games_path, out_path):
    def get_solutions(game):
        solutions = []
        board = game.board()
        captures = []
        fens = [board.fen()]
        first_move_number = 0
        turn_color = board.turn
        solution = 0

        for move_number, move in enumerate(game.mainline_moves(), 1):
            if board.is_capture(move) and not board.is_en_passant(move):
                captured_piece = board.piece_type_at(move.to_square)
                captures.append(move)
                change = PIECE_VALUES[captured_piece]
                if board.turn == turn_color:
                    solution += change
                else:
                    solution -= change
            else:
                if len(captures) > 2:
                    solutions.append({
                        "fens": fens,
                        "highlights": [[chess.square_name(c.to_square)] for c in captures] + [[]],
                        "solutions": {solution: solution},
                        "moveNumber": first_move_number,
                    })
                captures = []

                # The next move
                first_move_number = move_number + 1
                turn_color = not board.turn
                solution = 0
                fens = []

            board.push(move)
            fens.append(board.fen())

        return solutions

    process_games(games_path, out_path, get_solutions)

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
            print("Duplicate opening name!")

        opening_names[uci] = name

    out = {
        "tree": tree,
        "names": opening_names,
    }

    with open(out_path, "w") as f:
        json.dump(out, f)

@cli.command(name="undefended")
@click.argument('positions_path', type=click.Path(exists=True))
@click.argument('out_path', type=click.Path())
def cli_undefended(positions_path, out_path):
    def get_solutions(fen):
        board = chess.Board(fen)

        solutions = {s: s for s in get_undefended_squares(board)}
        if not solutions:
            return None

        return solutions

    process_positions(positions_path, out_path, get_solutions)

def process_games(games_path, out_path, get_solutions):
    games = []
    with open(games_path) as f:
        while True:
            game = chess.pgn.read_game(f)
            if game is None:
                break  # end of file

            games.append(game)

    solutions = []
    for game in tqdm(games):
        for solution in get_solutions(game):
            if not solution:
                continue

            solution["site"] = get_site(game, solution["moveNumber"])
            solutions.append(solution)

    out_df = pd.DataFrame(solutions)
    out_df.to_json(out_path, orient="records")

def process_positions(positions_path, out_path, get_solutions):
    reader = pd.read_json(positions_path, chunksize=1000, lines=True)

    outs = []
    for df in tqdm(reader):
        df["solutions"] = df["fen"].map(get_solutions)
        outs.append(df)

    out_df = pd.concat(outs)
    out_df.dropna(subset=["solutions"], inplace=True)

    out_df.to_json(out_path, orient="records", lines=True)

def get_undefended_squares(board):
    undefended_squares = set()
    for color in COLORS:
        for chessman in PIECES:
            for square in board.pieces(chessman, color):
                defender_squares = board.attackers(color, square)

                if not defender_squares:
                    undefended_squares.add(chess.SQUARE_NAMES[square])

    return undefended_squares

def is_mate_1(board):
    board = board.copy()
    for color in COLORS:
        board.turn = color
        for move in board.legal_moves:
            board.push(move)
            if board.is_checkmate():
                return True
            board.pop()

    return False

def get_knight_forks(pieces):
    puzzles = []
    no_solutions = []
    for piece_squares, board in piece_combinations(pieces):
        fen = board.fen()

        # Find the squares that adding a knight to what create a fork 
        knight_fork_squares = []
        for square in chess.SQUARES:
            if square in piece_squares:
                continue

            board.set_piece_at(square, chess.Piece(chess.KNIGHT, chess.BLACK))

            if all([board.is_attacked_by(chess.BLACK, s) for s in piece_squares]):
                knight_fork_squares.append(square)

            board.remove_piece_at(square)

        puzzle = { "fen": fen, "solutions": [] }
        if knight_fork_squares:
            solutions = [chess.SQUARE_NAMES[square] for square in knight_fork_squares]
            puzzle["solutions"] = { s: s for s in solutions}
            puzzles.append(puzzle)
        else:
            no_solutions.append(puzzle)

    return puzzles, no_solutions

def piece_combinations(pieces):
    for piece_squares in itertools.combinations(chess.SQUARES, len(pieces)):
        board = chess.Board()

        board.clear()
        for idx, piece in enumerate(pieces):
            board.set_piece_at(piece_squares[idx], piece)

        yield piece_squares, board

def games_reader(pgn_path):
    with open(pgn_path) as pgn_file:
        while True:
            game = chess.pgn.read_game(pgn_file)
            if game is None:
                break

            yield game

def get_site(game, move_number):
    return f"{game.headers['Site']}#{move_number - 1}"

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    cli()
