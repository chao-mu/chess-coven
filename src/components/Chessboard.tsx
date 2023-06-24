// React
import React, { useEffect, useRef, useState } from "react";

// NextJS
import Link from "next/link";

// Chessground
import { Chessground } from 'chessground';
import { Api as BoardApi } from 'chessground/api';
import { Key } from 'chessground/types';
import { Config } from 'chessground/config'

type ChessboardProps = {
  moveable?: boolean
  fen?: string;
  goodSquares?: Key[];
  badSquares?: Key[];
  highlightedSquares?: Key[];
  flipped?: boolean;
  gameUrl?: string;
  onMove?: (san: string) => void;
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
  const boardRef = useRef<HTMLDivElement>(null);
  const [board, setBoard] = useState<BoardApi | null>(null);

  useEffect(() => {
    if (!boardRef.current) {
      return
    }

    const config: Config = moveable ? {
      fen: fen,
      movable: {
        free: true,
        events: {
          after: (orig: Key, dest: Key) => {
            onMove && onMove(orig + dest)
            board?.set({ fen: fen })
          }
        },
      },
    } : {
      fen: fen,
      events: {
        select: (k: Key) => onSquareClick && onSquareClick(k.toString())
      },
      drawable: {
        enabled: false,
        autoShapes: goodSquares.map(s => ({ orig: s, brush: "green" })).concat
          (
            badSquares.map(s => ({ orig: s, brush: "red" }))).concat(
              highlightedSquares.map(s => ({ orig: s, brush: "yellow" })))
      }
    }

    if (board) {
      board.set(config)
    } else {
      const chessgroundApi = Chessground(boardRef.current);
      chessgroundApi.set(config)
      setBoard(chessgroundApi);
    }
  }, [boardRef, board, onMove, goodSquares, badSquares, highlightedSquares]);

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
        <div ref={boardRef} style={{ width: '100%', height: '100%' }} />
      </ChessboardWrapper>
      <div className={`flex items-center justify-center border-2 border-black ${bottomColor} min-h-[2rem] pr-6 text-black`}>
        {gameSourceEl}
      </div >
    </div>
  );
}
