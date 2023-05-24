// React
import React from 'react'

// chess.js
import { Chess, Piece } from 'chess.js'

// Components
import { ChessboardSquare } from './ChessboardSquare'

type ChessboardProps = {
  fen?: string
  goodSquares?: string[]
  badSquares?: string[]
  onSquareClick?: (square: string) => void
  flipped?: boolean
}

export function Chessboard({fen, onSquareClick, goodSquares=[], badSquares=[], flipped=false}: ChessboardProps) {
  let board: Array<Array<Piece | null>> = Array(8).fill(Array(8).fill(null))
  if (fen) {
    board = (new Chess(fen).board())
  }

  if (flipped) {
    board = board.reverse()
    board = board.map(row => row.reverse())
  }

  function toSquareName(row: number, col: number): string {
    const rowIdx = flipped ? 7 - row : row
    const colIdx = flipped ? 7 - col : col
    const rowName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][rowIdx]
    const colName = colIdx.toString()
    return `${rowName}${colName}`
  }

  return (
    <div className={`flex ${flipped ? 'flex-col-reverse' : 'flex-col'}`}>
      <div className="bg-red-400 text-lg text-right px-4 py-1 border-2  border-black text-black">
        Black
      </div>
      <div className="grid grid-cols-8 border-x-2 border-black">
        {board.map((row, colIdx) => (
          row.map((piece, rowIdx) => {
            const square = toSquareName(rowIdx, colIdx)
            return (
              <button onClick={() => onSquareClick && onSquareClick(square)} key={square}>
                <ChessboardSquare
                  piece={piece}
                  isLight={(colIdx + rowIdx) % 2 == (flipped ? 1 : 0)}
                  isGood={goodSquares.includes(square)}
                  isBad={badSquares.includes(square)}
                />
              </button>
            )
          })
        ))}
      </div>
      <div className="bg-red-100 text-lg text-left border-2 px-4 py-1 border-black text-black">
        White
      </div>
    </div>
  )
}
