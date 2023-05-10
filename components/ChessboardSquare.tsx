// React
import React from 'react'

// chess.js
import { WHITE, Piece } from 'chess.js'

// https://github.com/nikfrank/react-chess-pieces
import PieceComponent from 'react-chess-pieces';

export type ChessboardSquareProps = {
  piece: Piece | null | undefined
  isLight: boolean
}

export function ChessboardSquare(props: ChessboardSquareProps) {
  const fill = props.isLight ? 'bg-fuchsia-100' : 'bg-fuchsia-500'

  let piece: string | null = null
  if (props.piece) {
    piece = props.piece.type
    if (props.piece.color === WHITE) {
      piece = piece.toUpperCase()
    }
  }

  return (
    <div
      className={`${fill} aspect-square`}
    >
      { piece && <PieceComponent piece={piece} /> }
    </div>
  )
}
