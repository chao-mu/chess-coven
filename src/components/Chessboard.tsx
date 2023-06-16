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
  children?: React.ReactNode;
};

function ChessboardWrapper(
  { flipped, children }: { flipped: boolean, children: React.ReactNode }) {
  return (
    <div className="relative m-auto flex aspect-square min-h-0 flex-col">
      <canvas width="10000" height="10000" className="max-h-full max-w-full" />
      <div className={`absolute inset-0 flex ${flipped ? "flex-col-reverse" : "flex-col"}`}>
        {children}
      </div>
    </div>
  )
}

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
  children,
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

  const topColor = flipped ? 'bg-red-100' : 'bg-red-400'
  const bottomColor = flipped ? 'bg-red-400' : 'bg-red-100'

  return (
    <div className="flex min-h-0 flex-col">
      <div className={`border-2 border-black ${topColor} min-h-[2rem] text-black`}>
        {children}
      </div>
      <ChessboardWrapper flipped={flipped}>
        <>
          {board.map((row, colIdx) => (
            <div
              className={`flex h-full ${flipped ? "flex-row-reverse" : "flex-row"}`}
              key={colIdx}
            >
              {row.map((squareInfo, rowIdx) => {
                const square = toSquareName(colIdx, rowIdx);

                return (
                  <button
                    id={`square-${square}`}
                    onClick={() => handleSquareClick(square, squareInfo)}
                    key={rowIdx}
                    className="h-full w-full"
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
        </>
      </ChessboardWrapper>
      <div className={`flex items-center justify-center border-2 border-black ${bottomColor} min-h-[2rem] pr-6 text-black`}>
        {gameSourceEl}
      </div >
    </div>
  );
}
