from dataclasses import dataclass

from chesscoven.common import PIECE_VALUES, Puzzle

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


def calc_level(captures):
    square_diversity = len(set(c.to_square for c in captures))
    piece_value_diversity = len(
        set(PIECE_VALUES[c.captured_piece] for c in captures))

    return square_diversity * len(captures) + piece_value_diversity


def build_puzzle(fens, captures, first_move_number):
    return Puzzle(
        solutions=[calculate_solution(captures)],
        fens=fens,
        highlights=[
            [chess.square_name(c.to_square)] for c in captures] + [[]],
        game_move_number=first_move_number,
        level=calc_level(captures)
    )


def prune_counting(in_df):
    def is_trade(solutions):
        return solutions[0] == 0

    def is_gain(solutions):
        return solutions[0] > 0

    def is_loss(solutions):
        return solutions[0] < 0

    df_gain = in_df[in_df["solutions"].apply(is_gain)]
    df_loss = in_df[in_df["solutions"].apply(is_loss)]
    df_trades = in_df[in_df["solutions"].apply(is_trade)]

    sources = [df_gain, df_loss, df_trades]

    target_total = 2000
    sample_size = target_total // len(sources)

    out_df = pd.concat(df.sample(min(len(df), sample_size)) for df in sources)

    return out_df


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
