"use client"

// React
import React from 'react'

// Components
import { SolutionClicker } from '@/components/SolutionClicker';

// Assets
import forkables from '@/assets/puzzles/knight-forkable.json';


const TITLE = "Catapult Knights"

const RULES = "Click squares that would create a knight fork. In other words, a place where if a knight was placed, the queen and king would both be attacked."

const STORY = "The king and queen of the enemy army think they're safe chilling at the local outdoor pub. Catapult a knight across the kingdom (it's a storng catapult) and cause mayham!"

export default function Page() {
  const randomPuzzle = () => forkables[Math.floor(Math.random() * forkables.length)];
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
