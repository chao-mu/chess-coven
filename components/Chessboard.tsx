// React
import React from 'react'

// chess.js
import { Chess } from 'chess.js'

// Components
import { ChessboardSquare } from './ChessboardSquare'

type ChessboardProps = {
  fen: string | undefined
  goodSquares: string[]
  badSquares: string[]
  onSquareClick?: (square: string) => void
}

export function Chessboard({fen, goodSquares=[], badSquares=[], onSquareClick}: ChessboardProps) {
  let chess = new Chess()
  if (fen) {
    chess = new Chess(fen)
  }

  function squareName(row: number, col: number): string {
    const rowName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][row]
    const colName = 8 - col
    return `${rowName}${colName}`
  }

  return (
    <div className="grid grid-cols-8">
      {chess.board().map((row, rowIdx) => (
        row.map(((piece, colIdx) => (
          <ChessboardSquare
            piece={piece}
            isLight={(rowIdx + colIdx) % 2 === 1}
            isGood={goodSquares.includes(squareName(rowIdx, colIdx))}
            isBad={badSquares.includes(squareName(rowIdx, colIdx))}
            key={squareName(rowIdx, colIdx)} 
          />
          )))
      ))}
    </div>
  )
}
