// React
import React, { useEffect, useRef, useState } from "react";

// NextJS
import Link from "next/link";

// Chessground
import { Chessground } from "chessground";
import { Api as BoardApi } from "chessground/api";
import { Key } from "chessground/types";
import { Config } from "chessground/config";

type ChessboardProps = {
  movable?: boolean;
  fen?: string;
  goodSquares?: Key[];
  badSquares?: Key[];
  highlightedSquares?: Key[];
  flipped?: boolean;
  gameUrl?: string;
  onMove?: (san: string) => boolean;
  onSelect?: (square: string) => void;
  children?: React.ReactNode;
};

function ChessboardWrapper({
  flipped,
  children,
}: {
  flipped: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative m-auto flex aspect-square min-h-0 flex-col">
      <canvas width="10000" height="10000" className="max-h-full max-w-full" />
      <div
        className={`absolute inset-0 flex ${
          flipped ? "flex-col-reverse" : "flex-col"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function onSelectFactory(f: ((s: Key) => void) | undefined) {
  if (!f) {
    return undefined;
  }

  let last = Date.now();
  return (s: Key) => {
    const now = Date.now();
    if (now - last > 300) {
      last = now;
      f(s);
    }
  };
}

export function Chessboard({
  gameUrl,
  fen,
  onMove,
  onSelect,
  children,
  goodSquares = [],
  badSquares = [],
  highlightedSquares = [],
  flipped = false,
  movable = false,
}: ChessboardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [board, setBoard] = useState<BoardApi | null>(null);

  useEffect(() => {
    if (!boardRef.current) {
      return;
    }

    let config: Config = {
      fen: fen,
      orientation: flipped ? "black" : "white",
      animation: { enabled: true },
    };

    if (movable) {
      config = {
        ...config,
        movable: {
          free: true,
          events: {
            after: (orig: Key, dest: Key) => {
              if (!onMove) {
                return;
              }

              const allow = onMove(orig + dest);
              if (!allow) {
                board?.cancelMove();
                board?.set(config);
              }
            },
          },
        },
      };
    } else {
      config = {
        ...config,
        events: {
          select: onSelectFactory(onSelect),
        },
        movable: { free: false },
        draggable: { enabled: false },
        drawable: {
          enabled: false,
          autoShapes: goodSquares
            .map((s) => ({ orig: s, brush: "green" }))
            .concat(badSquares.map((s) => ({ orig: s, brush: "red" })))
            .concat(
              highlightedSquares.map((s) => ({ orig: s, brush: "yellow" }))
            ),
        },
      };
    }

    if (board) {
      board.set(config);
    } else {
      const chessgroundApi = Chessground(boardRef.current, {
        ...config,
        animation: { enabled: false },
      });
      setBoard(chessgroundApi);
    }
  }, [
    board,
    boardRef,
    fen,
    flipped,
    movable,
    goodSquares,
    badSquares,
    highlightedSquares,
    onMove,
    onSelect,
  ]);

  let gameSourceEl = null;
  if (gameUrl) {
    gameSourceEl = (
      <Link href={gameUrl} className="text-blue-800" target="_blank">
        View on Lichess
      </Link>
    );
  }

  const topColor = flipped ? "bg-red-100" : "bg-red-400";
  const bottomColor = flipped ? "bg-red-400" : "bg-red-100";

  return (
    <div className="flex min-h-0 flex-col">
      <div
        className={`border-2 border-black ${topColor} min-h-[2rem] text-black`}
      >
        {children}
      </div>
      <ChessboardWrapper flipped={flipped}>
        <div ref={boardRef} className="h-full w-full" />
      </ChessboardWrapper>
      <div
        className={`flex items-center justify-center border-2 border-black ${bottomColor} min-h-[2rem] pr-6 text-black`}
      >
        {gameSourceEl}
      </div>
    </div>
  );
}
