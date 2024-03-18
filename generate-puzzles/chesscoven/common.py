#!/usr/bin/env python

# Core
import itertools
import requests
from typing import Optional, Any
from dataclasses import dataclass, field

# Chess
import chess
import chess.pgn

PIECE_VALUES = {
    chess.PAWN: 1,
    chess.KNIGHT: 3,
    chess.BISHOP: 3,
    chess.ROOK: 5,
    chess.QUEEN: 9,
}

PIECES = [chess.PAWN, chess.KNIGHT, chess.BISHOP, chess.ROOK, chess.QUEEN]


@dataclass
class Puzzle:
    fens: list = field(default_factory=list)
    solution_aliases: dict[str, str] = field(default_factory=dict)
    solutions: list = field(default_factory=list)
    site: Optional[str] = None
    game_move_number: Optional[int] = None
    highlights: list[list[str]] = field(default_factory=list)
    level: int = 1
    extra: dict[str, Any] = field(default_factory=dict)


def count_pieces(fen=None, board=None):
    if fen is not None:
        board = chess.Board(fen)

    return len(board.piece_map())


def get_undefended_squares(board):
    undefended_squares = set()
    for color in chess.COLORS:
        for chessman in PIECES:
            for square in board.pieces(chessman, color):
                defender_squares = board.attackers(color, square)

                if not defender_squares:
                    undefended_squares.add(chess.SQUARE_NAMES[square])

    return undefended_squares


def is_mate_1(board):
    board = board.copy()
    for color in chess.COLORS:
        board.turn = color
        for move in board.legal_moves:
            board.push(move)
            if board.is_checkmate():
                return True
            board.pop()

    return False


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


def get_lichess_games(usernames):
    # Scrape games for each user
    for username in usernames:
        max_results = 200
        for perf_type in ["classical", "rapid"]:
            url = f"https://lichess.org/api/games/user/{username}?max={max_results}&evals=false&perfType={perf_type}"

            response = requests.get(url)
            yield response.content


def get_even_distribution(df, label):
    groups = df.groupby(label)
    size = min(len(group) for _, group in groups)
    return groups.apply(lambda x: x.sample(size))


def print_stats(df):
    stats = get_stats(df)
    indent = " " * 2
    loglines = []
    loglines.append("# Levels")
    for level, count in stats["levels"].items():
        loglines.append(f"{indent}{level} - {count}")

    print("\n".join(loglines))


def get_stats(df):
    levels = dict(df.groupby("level").size())

    return {"levels": levels}
