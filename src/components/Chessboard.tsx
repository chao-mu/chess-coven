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
  console.log(board);
  return (
    <div className={`flex ${flipped ? "flex-col-reverse" : "flex-col"}`}>
      <div className="border-2 border-black bg-red-400 px-4 py-1 text-right  text-lg text-black">
        Black
      </div>
      <div className={`flex ${flipped ? "flex-col-reverse" : "flex-col"}`}>
        {board.map((row, colIdx) => (
          <div
            className={`flex ${flipped ? "flex-row-reverse" : "flex-row"}`}
            key={colIdx}
          >
            {row.map((squareInfo, rowIdx) => {
              const square = toSquareName(colIdx, rowIdx);

              return (
                <button
                  id={`square-${square}`}
                  onClick={() => onSquareClick && onSquareClick(square)}
                  key={rowIdx}
                  className="h-full w-full"
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
            })}
          </div>
        ))}
      </div>
      <div className="border-2 border-black bg-red-100 px-4 py-1 text-left text-lg text-black">
        White
      </div>
    </div>
  );
}
