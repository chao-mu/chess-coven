from chesscoven.common import get_undefended_squares

import chess


def get_undefended_solutions(fen):
    board = chess.Board(fen)

    solutions = {s: s for s in get_undefended_squares(board)}
    if not solutions:
        return None

    return solutions
