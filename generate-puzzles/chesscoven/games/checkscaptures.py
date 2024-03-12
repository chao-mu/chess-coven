import chess


def get_checks_captures_solutions(fen):
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

            square_pair = chess.square_name(
                continuation.from_square) + chess.square_name(continuation.to_square)
            solutions[square_pair] = board.san(
                continuation) or continuation

    if not solutions:
        return None

    return solutions
