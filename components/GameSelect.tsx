// React
import React from 'react'

// React Hook Form
import { useForm } from 'react-hook-form'

// Types
import { Game } from '@/types'

type GameSelectProps = {
  setGame: (game: Game) => void
  games: Game[]
}

type FormValues = {
  game: number
}

export function GameSelect({ setGame, games }: GameSelectProps) {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = ({ game }: FormValues) => {
    setGame(games[game])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-end max-w-10 gap-2">
      <select
        {...register('game')}
        className="w-full p-2 text-xl bg-transparent border-2 border-purple-500 rounded-lg"
      >
        {games.map((game, idx) => (
          <option key={idx} value={idx}>
            {game.event}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="p-2 text-xl border-2 border-purple-500 rounded-lg"
      >
        Load
      </button>
    </form>
  )
}
