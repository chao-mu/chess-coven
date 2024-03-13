from chesscoven.common import get_undefended_squares, Puzzle

import chess


def generate_undefended(fen):
    board = chess.Board(fen)

    solutions = get_undefended_squares(board)
    if not solutions:
        return []

    return [Puzzle(solutions=solutions)]
