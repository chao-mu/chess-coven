// React
import React, { useReducer } from "react";

// NextJS
import Link from "next/link";

// Chessground
import Chessground from "@react-chess/chessground";
import { Key } from "chessground/types"

type ChessboardProps = {
  moveable?: boolean
  fen?: string;
  goodSquares?: Key[];
  badSquares?: Key[];
  highlightedSquares?: Key[];
  flipped?: boolean;
  gameUrl?: string;
  onMove?: (move: string) => void;
  onSquareClick?: (square: string) => void;
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
  gameUrl,
  fen,
  onMove,
  onSquareClick,
  goodSquares = [],
  badSquares = [],
  highlightedSquares = [],
  flipped = false,
  moveable = false,
  children,
}: ChessboardProps) {
  let gameSourceEl = null;
  if (gameUrl) {
    gameSourceEl = (
      <Link href={gameUrl} className="text-blue-800" target="_blank">
        View on Lichess
      </Link>
    );
  }
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const topColor = flipped ? 'bg-red-100' : 'bg-red-400'
  const bottomColor = flipped ? 'bg-red-400' : 'bg-red-100'

  return (
    <div className="flex min-h-0 flex-col">
      <div className={`border-2 border-black ${topColor} min-h-[2rem] text-black`}>
        {children}
      </div>
      <ChessboardWrapper flipped={flipped}>
        {moveable ? (
          <Chessground contained config={{
            ...(fen ? { fen: fen } : {}),
            orientation: flipped ? "black" : "white",
            movable: {
              free: true,
            },
            events: {
              move: (orig, dest) => {
                onMove && onMove(orig + dest)
                forceUpdate()
              }
            }
          }} />
        ) : (
          <Chessground contained config={{
            ...(fen ? { fen: fen } : {}),
            orientation: flipped ? "black" : "white",
            events: {
              select: (k: Key) => onSquareClick && onSquareClick(k.toString())
            },
            movable: { free: false },
            draggable: { enabled: false },
            drawable: {
              enabled: false,
              autoShapes: goodSquares.map(s => ({ orig: s, brush: "green" })).concat(
                badSquares.map(s => ({ orig: s, brush: "red" }))).concat(
                  highlightedSquares.map(s => ({ orig: s, brush: "yellow" })))

            }
          }} />
        )}
      </ChessboardWrapper>
      <div className={`flex items-center justify-center border-2 border-black ${bottomColor} min-h-[2rem] pr-6 text-black`}>
        {gameSourceEl}
      </div >
    </div>
  );
}
