"use client"

// React
import React from 'react'

// Components
import { SolutionClicker } from '@/components/SolutionClicker';

// Assets
import checkables from '@/assets/puzzles/checkables.json';


const TITLE = "Misarable King"

const RULES = "Select every piece and pawn that could potentially be moved such that it checks its enemy king. Once all solutions are provided, the level will advance."

const STORY = "The monarchies of the world have been overthrown by the people. The kings have been imprisoned in their own castles. The people have decided to let the monarchs live, but they must be kept in check."

export default function Page() {
  const randomPuzzle = () => checkables[Math.floor(Math.random() * checkables.length)];
  return (
    <div className="flex flex-col bg-gray-800/50">
      <SolutionClicker
        nextPuzzle={randomPuzzle}
        title={TITLE}
        story={STORY}
        rules={RULES}
      />
    </div>
  )
}
