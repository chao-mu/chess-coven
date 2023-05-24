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
        className="w-full overflow-hidden text-ellipsis rounded-md bg-white px-2 py-1 text-xl text-black ring-2"
      >
        {games.map((game, idx) => (
          <option key={idx} value={idx}>
            {game.event}
          </option>
        ))}
    </select>
  )
}
