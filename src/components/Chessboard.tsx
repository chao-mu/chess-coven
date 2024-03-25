// React
import React, { useEffect, useRef, useState } from "react";

// NextJS
import Link from "next/link";

// Chessground
import { Chessground } from "chessground";
import { type Api as BoardApi } from "chessground/api";
import { type Key } from "chessground/types";
import { type Config } from "chessground/config";

type ChessboardProps = {
  viewOnly?: boolean;
  movable?: boolean;
  fen?: string;
  goodSquares?: Key[];
  badSquares?: Key[];
  highlightedSquares?: Key[];
  flipped?: boolean;
  gameUrl?: string | null;
  onMove?: (san: string) => boolean;
  onSelect?: (square: string) => void;
  children?: React.ReactNode;
};

function onSelectFactory(f: ((s: Key) => void) | undefined) {
  if (!f) {
    return undefined;
  }

  let last: number | null = null;
  return (s: Key) => {
    const now = Date.now();
    if (last == null || now - last > 300) {
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
  viewOnly = false,
  goodSquares = [],
  badSquares = [],
  highlightedSquares = [],
  flipped = false,
  movable = false,
}: ChessboardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const boardWrapperRef = useRef<HTMLDivElement>(null);
  const [board, setBoard] = useState<BoardApi | null>(null);

  useEffect(() => {
    if (!boardRef.current) {
      return;
    }

    let config: Config = {
      viewOnly,
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
              highlightedSquares.map((s) => ({ orig: s, brush: "blue" })),
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
    viewOnly,
    fen,
    flipped,
    movable,
    goodSquares,
    badSquares,
    highlightedSquares,
    onMove,
    onSelect,
  ]);

  useEffect(() => {
    const wrapper = boardWrapperRef.current;
    if (!wrapper || !board) {
      return;
    }

    const wrapperParent = wrapper.parentElement;
    if (!wrapperParent) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      const rect = wrapperParent.getBoundingClientRect();
      const minLength = Math.min(rect.height, rect.width);
      console.log(rect.toJSON());
      const sizeAttr = `${minLength}px`;
      wrapper.style.width = sizeAttr;
      wrapper.style.height = sizeAttr;
      wrapperParent.style.maxHeight = sizeAttr;
    });

    resizeObserver.observe(wrapperParent);
    return () => resizeObserver.disconnect(); // clean up
  }, [boardWrapperRef, board]);

  return (
    <div
      className={`flex-1 justify-center items-center flex ${flipped ? "flex-col-reverse" : "flex-col"}`}
    >
      <div ref={boardWrapperRef}>
        <div
          ref={boardRef}
          className="flex justify-center items-center h-full w-full"
        />
      </div>
    </div>
  );
}
