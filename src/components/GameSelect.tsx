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
        className="overflow-hidden w-full text-xl text-ellipsis ring-2 rounded-md px-2 py-1 bg-white text-black"
      >
        {games.map((game, idx) => (
          <option key={idx} value={idx}>
            {game.event}
          </option>
        ))}
    </select>
  )
}
