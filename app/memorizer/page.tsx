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
      <h1 className="text-5xl text-center mb-3 font-header">Memorizer/Notation Trainer</h1>
      <div className="font-bold font-header max-w-2xl">
        <GameSelect setGame={setGame} games={games} />
        <div className="mt-2"/>
        <GameMemorizer pgn={game.pgn} />
      </div>
    </div>
  )
}
