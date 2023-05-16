// React
import React from 'react'

// chess.js
import { Chess } from 'chess.js'

// Components
import { ChessboardSquare } from './ChessboardSquare'

type ChessboardProps = {
  fen?: string
  goodSquares?: string[]
  badSquares?: string[]
  onSquareClick?: (square: string) => void
}

export function Chessboard({fen, onSquareClick, goodSquares=[], badSquares=[]}: ChessboardProps) {
  let chess = new Chess()
  if (fen) {
    chess = new Chess(fen)
  }

  function toSquareName(row: number, col: number): string {
    const rowName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][row]
    const colName = 8 - col
    return `${rowName}${colName}`
  }

  return (
    <div className="grid grid-cols-8">
      {chess.board().map((row, colIdx) => (
        row.map((piece, rowIdx) => {
          const square = toSquareName(rowIdx, colIdx)
          return (
            <button onClick={() => onSquareClick && onSquareClick(square)} key={square}>
              <ChessboardSquare
                piece={piece}
                isLight={(colIdx + rowIdx) % 2 === 1}
                isGood={goodSquares.includes(square)}
                isBad={badSquares.includes(square)}
              />
            </button>
          )
        })
      ))}
    </div>
  )
}
