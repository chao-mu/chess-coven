"use client"

// React
import React from 'react'
import { useState } from 'react'

// Types
import { Game } from '@/types'

// Assets
import games from '../../assets/games.json'

// Components
import { GameMemorizer } from '../../components/GameMemorizer'
import { GameSelect } from '../../components/GameSelect'

export default function MemorizerPage() {
  const [game, setGame] = useState<Game>(games[0])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 mt-4">
      <div className="text-5xl font-bold font-header">Game Memorizer</div>
      <div className="max-w-4xl">
        <GameSelect setGame={setGame} games={games} />
      </div>
      <GameMemorizer pgn={game.pgn} />
    </div>
  )
}
