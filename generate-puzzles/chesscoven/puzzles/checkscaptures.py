import chess

from chesscoven.common import Puzzle


def generate_checks_captures(fen):
    board = chess.Board(fen)

    # Skip positions where there's already an active check
    if board.is_check():
        return []

    puzzle = Puzzle()
    for turn_color in chess.COLORS:
        board.turn = turn_color
        for continuation in board.legal_moves:
            if not (board.is_capture(continuation) or board.gives_check(continuation)):
                continue

            if board.is_en_passant(continuation):
                continue

            square_pair = chess.square_name(
                continuation.from_square) + chess.square_name(continuation.to_square)

            puzzle.solutions.append(square_pair)
            puzzle.solution_aliases[square_pair] = board.san(
                continuation) or continuation

    if not puzzle.solutions:
        return []

    return [puzzle]
