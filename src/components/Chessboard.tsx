// React
import React from "react";

// Components
import { ChessboardSquare } from "@/components/ChessboardSquare";

// Types
import { Board } from "@/types";

// Utils
import { toSquareName } from "@/utils";

type ChessboardProps = {
  board: Board;
  goodSquares?: string[];
  badSquares?: string[];
  onSquareClick?: (square: string) => void;
  highlightedSquares?: string[];
  flipped?: boolean;
  onMove?: (move: string) => void;
};

export function Chessboard({
  onSquareClick,
  board,
  goodSquares = [],
  badSquares = [],
  highlightedSquares = [],
  flipped = false,
}: ChessboardProps) {
  board = board.map((row) => [...row]);
  if (flipped) {
    board.reverse();
    board.forEach((row) => row.reverse());
  }

  return (
    <div className={`flex ${flipped ? "flex-col-reverse" : "flex-col"}`}>
      <div className="border-2 border-black bg-red-400 px-4 py-1 text-right  text-lg text-black">
        Black
      </div>
      <div className="grid grid-cols-8 border-x-2 border-black">
        {board.map((row, colIdx) =>
          row.map((squareInfo, rowIdx) => {
            const square = toSquareName(colIdx, rowIdx, flipped);

            return (
              <button
                id={`square-${square}`}
                onClick={() => onSquareClick && onSquareClick(square)}
                key={square}
              >
                <ChessboardSquare
                  piece={squareInfo}
                  isLight={(colIdx + rowIdx) % 2 == (flipped ? 1 : 0)}
                  isGood={goodSquares.includes(square)}
                  isBad={badSquares.includes(square)}
                  isHighlighted={highlightedSquares.includes(square)}
                />
              </button>
            );
          })
        )}
      </div>
      <div className="border-2 border-black bg-red-100 px-4 py-1 text-left text-lg text-black">
        White
      </div>
    </div>
  );
}
