// React
import React from 'react'

// Types
import { Game } from '@/types'

type GameSelectProps = {
  setGame: (game: Game) => void
  games: Game[]
}

export function GameSelect({ setGame, games }: GameSelectProps) {
  return (
    <select
      onChange={(e) => setGame(games[parseInt(e.target.value)])}
      className="w-full p-2 text-xl bg-transparent border-2 border-purple-500 rounded-lg"
    >
      {games.map((game, idx) => (
        <option key={idx} value={idx}>
          {game.event}
        </option>
      ))}
    </select>
  )
}
