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
  draggable?: boolean
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
  onMove,
  goodSquares = [],
  badSquares = [],
  highlightedSquares = [],
  flipped = false,
  draggable = false,
}: ChessboardProps) {
  const [pendingMove, setPendingMove] = useState<string | null>(null);

  const onDrag = (square: string) => {
    setPendingMove("")
    updatePendingMove(square, true)
  }

  const onDrop = (square: string) => {
    updatePendingMove(square, true)
  }

  const updatePendingMove = (square: string, pieceSelected: boolean) => {
    if (!pendingMove) {
      if (pieceSelected) {
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
    <div className={`flex min-h-0 ${flipped ? "flex-col-reverse" : "flex-col"}`}>
      <div className="flex items-center justify-between border-2 border-black bg-red-400 px-4 text-black">
        <div>Black</div>
        {!flipped && gameSourceEl}
      </div>
      <div className="relative aspect-square min-h-0 m-auto flex flex-col">
        <canvas width="10000" height="10000" className="max-h-full max-w-full" />
        <div className={`absolute inset-0 flex ${flipped ? "flex-col-reverse" : "flex-col"}`}>
          {board.map((row, colIdx) => (
            <div
              className={`h-full full flex ${flipped ? "flex-row-reverse" : "flex-row"}`}
              key={colIdx}
            >
              {row.map((squareInfo, rowIdx) => {
                const square = toSquareName(colIdx, rowIdx);

                return (
                  <button
                    id={`square-${square}`}
                    onClick={() => handleSquareClick(square, squareInfo)}
                    key={rowIdx}
                    className="w-full h-full"
                  >
                    <ChessboardSquare
                      draggable={draggable}
                      piece={squareInfo}
                      isLight={(colIdx + rowIdx) % 2 == 0}
                      isGood={goodSquares.includes(square)}
                      isBad={badSquares.includes(square)}
                      isHighlighted={highlightedSquares.includes(square)}
                      isSelected={!!pendingMove?.startsWith(square)}
                      onPieceDrag={() => onDrag(square)}
                      onPieceDrop={() => onDrop(square)}
                    />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between border-2 border-black bg-red-100 px-4 text-black">
        <div>White</div>
        {flipped && gameSourceEl}
      </div>
    </div>
  );
}
