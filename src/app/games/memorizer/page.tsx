"use client"

// React
import React from 'react'
import { useState } from 'react'

// Types
import { Game } from '@/types'

// Assets
import games from '@/assets/games.json'

// Components
import { GameMemorizer } from '@/components/GameMemorizer'
import { GameSelect } from '@/components/GameSelect'

export default function MemorizerPage() {
  const [game, setGame] = useState<Game>(games[0])

  return (
    <div className="flex flex-col">
      <div className="px-4 bg-purple-500 flex flex-col text-white pt-2">
        <div className="text-3xl font-bold">Game Memorizer</div>         
        <div className="text-lg flex flex-col">
          <div className="mb-4">Study the game then quiz yourself by entering the algebriac notation for the move.</div>
          <div className="whitespace-nowrap">White on bottom</div>
        </div>
      </div>                                       
      <div className="p-2 pt-1 bg-purple-500">
        <GameSelect setGame={setGame} games={games} />
      </div>
      <GameMemorizer pgn={game.pgn} />
    </div>
  )
}
