// React
import React from 'react'

// chess.js
import { Chess } from 'chess.js'

// Components
import { ChessboardSquare } from './ChessboardSquare'

type ChessboardProps = {
  fen: string | undefined
}

export function Chessboard(props: ChessboardProps) {

  let chess = new Chess()
  if (props.fen) {
    chess = new Chess(props.fen)
  }

  function squareName(row: number, col: number): string {
    const rowName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][row]
    const colName = 8 - col
    return `${rowName}${colName}`
  }

  return (
    <div className="grid grid-cols-8">
      {chess.board().map((row, rowIdx: number) => (
          row.map(((piece, colIdx) => (
            <ChessboardSquare piece={piece} isLight={(rowIdx + colIdx) % 2 === 1} key={squareName(rowIdx, colIdx)}/>
          )))
      ))}
    </div>
  )
}
