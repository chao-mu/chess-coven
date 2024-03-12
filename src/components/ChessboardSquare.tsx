// React draggable
import React, { type DragEvent } from "react";

// chess.js
import { WHITE, type Piece } from "chess.js";

// https://github.com/nikfrank/react-chess-pieces
import ChessPiece from "react-chess-pieces";

export type ChessboardSquareProps = {
  piece: Piece | null;
  isLight: boolean;
  isGood: boolean;
  isBad: boolean;
  isHighlighted: boolean;
  isSelected: boolean;
  draggable?: boolean;
  onPieceDrop: () => void;
  onPieceDrag: () => void;
};

export function ChessboardSquare(props: ChessboardSquareProps) {
  let fill = props.isLight ? "bg-red-100" : "bg-red-400";

  if (props.isSelected) {
    fill += "/50";
  }

  let piece: string | null = null;
  if (props.piece) {
    piece = props.piece.type;
    if (props.piece.color === WHITE) {
      piece = piece.toUpperCase();
    }
  }

  let circleClass = "border-4 rounded-full ";
  if (props.isHighlighted) {
    circleClass += "border-blue-500";
  } else if (props.isBad) {
    circleClass += "border-red-500";
  } else if (props.isGood) {
    circleClass += "border-green-500";
  } else {
    circleClass = "";
  }

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      className={`${fill} relative flex size-full items-center justify-center`}
    >
      <div className={`${circleClass} absolute size-full`}></div>
      <div
        draggable={!!piece && !!props.draggable}
        className="absolute size-full"
        onDragOver={onDragOver}
        onDragStart={props.onPieceDrag}
        onDrop={props.onPieceDrop}
      >
        {piece && <ChessPiece piece={piece} />}
      </div>
    </div>
  );
}
