from dataclasses import dataclass

from chesscoven.common import PIECE_VALUES, Puzzle, get_even_distribution

import chess

import pandas as pd


@dataclass
class Capture:
    to_square: chess.Square
    captured_piece: chess.PieceType
    captured_color: chess.Color


def generate_counting(game):
    puzzles = []
    board = game.board()

    captures = []
    fens = [board.fen()]
    first_move_number = 0
    for move_number, move in enumerate(game.mainline_moves(), 1):
        if board.is_capture(move) and not board.is_en_passant(move):
            capture = Capture(to_square=move.to_square,
                              captured_piece=board.piece_type_at(
                                  move.to_square),
                              captured_color=not board.turn)
            captures.append(capture)
        else:
            if len(captures) > 0:
                puzzles.append(build_puzzle(fens, captures, first_move_number))
            captures = []
            fens = []
            # The next move
            first_move_number = move_number + 1

        board.push(move)
        fens.append(board.fen())

    return puzzles


def get_square_diversity(captures):
    return len(set(c.to_square for c in captures))


def get_piece_value_diversity(captures):
    return len(set(PIECE_VALUES[c.captured_piece] for c in captures))


def calc_level(captures):
    square_diversity = get_square_diversity(captures)

    # Make our math easier by establishing invariants
    assert square_diversity > 0
    assert len(captures) > 0

    capture_level = min(len(captures), 5)
    if square_diversity == 1:
        return min(len(captures), 5)

    return min(square_diversity, 5) + capture_level


def build_puzzle(fens, captures, first_move_number):
    return Puzzle(
        solutions=[calculate_solution(captures)],
        fens=fens,
        highlights=[
            [chess.square_name(c.to_square)] for c in captures
        ] + [[]],
        game_move_number=first_move_number,
        level=calc_level(captures),
        extra={"captures": captures}
    )


# TODO max captures
def prune_counting(df):
    def is_white_to_play(extra):
        return extra["captures"][0]["captured_color"] == chess.BLACK

    def classify_trade(solution):
        if solution == 0:
            return "T"
        elif solution > 0:
            return "G"
        elif solution < 0:
            return "L"

    # Supplement
    df["solution"] = df["solutions"].apply(lambda s: s[0])
    df["is_white_to_play"] = df["extra"].apply(is_white_to_play)
    df["trade_type"] = df["solution"].apply(classify_trade)
    df["piece_value_diversity"] = df["extra"].apply(
        lambda x: get_piece_value_diversity([Capture(**c) for c in x["captures"]]))
    df["capture_count"] = df["extra"].apply(lambda x: len(x["captures"]))
    df["is_odd_captures"] = df["capture_count"].apply(lambda c: c % 2 != 0)

    # Prune all levels
    df = df[df["is_white_to_play"]]

    # Prune level 1
    by_level = {level: group for level, group in df.groupby("level")}
    lvl_1 = by_level[1]
    solution_counts = lvl_1["solution"].value_counts()

    target_size = min(solution_counts[points] for points in [1, 3, 5])
    by_level[1] = lvl_1.groupby("solution").sample(target_size, replace=True)

    # Prune level > 1
    for level in by_level:
        if level == 1:
            continue

        lvl_df = by_level[level]
        by_oddity = {
            is_odd: group
            for is_odd, group in lvl_df.groupby("is_odd_captures")
        }
        for is_odd in by_oddity:
            if is_odd:
                by_oddity[is_odd] = get_even_distribution(
                    by_oddity[is_odd], df["trade_type"] == "G")
            else:
                by_oddity[is_odd] = get_even_distribution(
                    by_oddity[is_odd], "trade_type")

        by_level[level] = pd.concat(list(by_oddity.values()))

    df = pd.concat(list(by_level.values()))

    # breakpoint()

    return df


def calculate_solution(captures):
    solution = 0
    player_color = not captures[0].captured_color
    for capture in captures:
        value = PIECE_VALUES[capture.captured_piece]
        if player_color == capture.captured_color:
            solution -= value
        else:
            solution += value

    return solution
