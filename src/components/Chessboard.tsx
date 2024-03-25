// React
import React, { Ref, RefObject, useEffect, useRef, useState } from "react";

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
  children?: React.ReactNode;
  topLevelRef: RefObject<HTMLElement>;
  onMove?: (san: string) => boolean;
  onSelect?: (square: string) => void;
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
  topLevelRef,
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
    const topLevel = topLevelRef.current;
    if (!wrapper || !topLevel) {
      return;
    }

    const wrapperParent = wrapper.parentElement;
    if (!wrapperParent) {
      return;
    }

    // min(top level - width, ???)
    const resizeObserver = new ResizeObserver(() => {
      const rect = wrapperParent.getBoundingClientRect();
      const minLength = Math.min(rect.height, rect.width);
      const sizeAttr = `${minLength}px`;
      wrapper.style.width = sizeAttr;
      wrapper.style.height = sizeAttr;
    });

    // I want to grow to consume all available space but stop when the parents space is exhausted.
    //
    // MIN OF max-w-2xl and 100vw

    resizeObserver.observe(wrapperParent);
    return () => resizeObserver.disconnect(); // clean up
  }, [boardWrapperRef, topLevelRef, board]);

  return (
    <div ref={boardWrapperRef} className="grow">
      <div
        ref={boardRef}
        className="flex justify-center items-center h-full w-full"
      />
    </div>
  );
}
