from chesscoven.common import PIECE_VALUES

import chess


def get_counting_solutions(game):
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
                    "solutions": {str(solution): str(solution)},
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
