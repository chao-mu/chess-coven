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
import { GameHeader } from '@/components/GameHeader'

export default function MemorizerPage() {
  const [game, setGame] = useState<Game>(games[0])

  return (
    <div className="flex flex-col bg-gray-800/50">
      <GameHeader title="Game Memorizer" rules="Study the game then quiz yourself by entering the algebriac notation for the move." />
      <div className="p-2 pt-1">
        <GameSelect setGame={setGame} games={games} />
      </div>
      <GameMemorizer pgn={game.pgn} />
    </div>
  )
}
