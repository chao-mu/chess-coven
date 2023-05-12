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
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <div className="text-4xl font-bold">Memorizer</div>
      <GameMemorizer pgn={game.pgn} />
      <GameSelect setGame={setGame} games={games} />
    </div>
  )
}
