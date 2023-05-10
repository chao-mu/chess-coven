// React
import React from 'react'

// Components
import { ChessboardSquare } from './ChessboardSquare'

export function Chessboard() {
  const squareRange = Array.from(Array(8).keys())

  return (
    <div className="grid grid-cols-8">
      {squareRange.map((row) => (
        <div key={row}>
          {squareRange.map((col) => (
            <ChessboardSquare piece="empty" isLight={(row + col) % 2 === 1} key={col} />
          ))}
        </div>
      ))}
    </div>
  )
}
