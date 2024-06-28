from chesscoven.common import piece_combinations, Puzzle

import chess
import random


def generate_knight_forkable():
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

    return puzzles


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

        puzzle = Puzzle(fens=[fen])
        if knight_fork_squares:
            puzzle.solutions = \
                [chess.SQUARE_NAMES[square] for square in knight_fork_squares]
            puzzles.append(puzzle)
        else:
            no_solutions.append(puzzle)

    return puzzles, no_solutions
