// React
import React, { useState } from "react";

// NextJS
import Link from "next/link";

// Components
import { ChessboardSquare } from "@/components/ChessboardSquare";

// Types
import { Board, SquareInfo } from "@/types";

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
  gameUrl?: string;
};

export function Chessboard({
  onSquareClick,
  board,
  gameUrl,
  goodSquares = [],
  badSquares = [],
  onMove,
  highlightedSquares = [],
  flipped = false,
}: ChessboardProps) {
  const [pendingMove, setPendingMove] = useState<string | null>(null);

  const updatePendingMove = (square: string, pieceClicked: boolean) => {
    if (!pendingMove) {
      if (pieceClicked) {
        setPendingMove(square);
      }

      return;
    }

    if (pendingMove == square) {
      setPendingMove(null);
      return;
    }

    const move = `${pendingMove}${square}`;
    setPendingMove(null);
    onMove && onMove(move);
  };

  const handleSquareClick = (square: string, squareInfo: SquareInfo | null) => {
    if (onSquareClick) {
      onSquareClick(square);
    } else {
      updatePendingMove(square, squareInfo != null);
    }
  };

  let gameSourceEl = null;
  if (gameUrl) {
    gameSourceEl = (
      <Link href={gameUrl} className="text-blue-800" target="_blank">
        View on Lichess
      </Link>
    );
  }

  return (
    <div className={`flex ${flipped ? "flex-col-reverse" : "flex-col"}`}>
      <div className="flex items-center justify-between border-2 border-black bg-red-400 px-4 py-1 text-black">
        <div>Black</div>
        {!flipped && gameSourceEl}
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
                  onClick={() => handleSquareClick(square, squareInfo)}
                  key={rowIdx}
                  className="aspect-square max-h-full w-full"
                >
                  <ChessboardSquare
                    piece={squareInfo}
                    isLight={(colIdx + rowIdx) % 2 == 0}
                    isGood={goodSquares.includes(square)}
                    isBad={badSquares.includes(square)}
                    isHighlighted={highlightedSquares.includes(square)}
                    isSelected={!!pendingMove?.startsWith(square)}
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex justify-between border-2 border-black bg-red-100 px-4 py-1 text-lg text-black">
        <div>White</div>
        {flipped && gameSourceEl}
      </div>
    </div>
  );
}
