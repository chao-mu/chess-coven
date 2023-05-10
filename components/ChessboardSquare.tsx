// React
import React from 'react'

export type PieceType =
  'white-king' |
  'white-queen' |
  'white-rook' |
  'white-bishop' |
  'white-knight' |
  'white-pawn' |
  'black-king' |
  'black-queen' |
  'black-rook' |
  'black-bishop' |
  'black-knight' |
  'black-pawn' |
  'empty'

type ChessboardSquareProps = {
  piece: PieceType
  isLight: boolean
}


export function ChessboardSquare(props: ChessboardSquareProps) {
  const fill = props.isLight ? 'bg-fuchsia-100' : 'bg-fuchsia-500'

  return (
    <div
      className={`${fill} aspect-square`}
    >
      {props.piece}
    </div>
  )
}
