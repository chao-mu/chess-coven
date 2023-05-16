// React
import React from 'react'

// chess.js
import { WHITE, Piece } from 'chess.js'

// https://github.com/nikfrank/react-chess-pieces
import ChessPiece from 'react-chess-pieces'

export type ChessboardSquareProps = {
  piece: Piece | null | undefined
  isLight: boolean
  isGood: boolean
  isBad: boolean
}

export function ChessboardSquare(props: ChessboardSquareProps) {
  const fill = props.isLight ? 'bg-fuchsia-100' : 'bg-fuchsia-400'

  let piece: string | null = null
  if (props.piece) {
    piece = props.piece.type
    if (props.piece.color === WHITE) {
      piece = piece.toUpperCase()
    }
  }

  let circleClass;
  if (props.isGood) {
    circleClass = 'border-green-500'
  } else if (props.isBad) {
    circleClass = 'border-red-500'
  } else {
    circleClass = 'border-none'
  }

  return (
    <div
      className={`${fill} aspect-square flex justify-center items-center`}
    >
      <div className={`${circleClass} border-4 rounded-full w-full h-full`}>
        { piece && <ChessPiece piece={piece} /> }
      </div>
    </div>
  )
}
