"use client";

// React
import React from 'react'
import { useState } from 'react'

// Components
import { SolutionClicker } from '@/components/SolutionClicker';
import { GameHeader } from '@/components/GameHeader';

// Types
import { Puzzle } from '@/types';

// Assets
import undefendedPieces from '@/assets/puzzles/undefended.json';

export default function Page() {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);

  React.useEffect(() => {
    // Randomize puzzles
    const randomizedPuzzles = undefendedPieces.sort(() => Math.random() - 0.5);
    setPuzzles(randomizedPuzzles);
  }, []);

  return (
    <div className="flex flex-col">
      <GameHeader title="Undefended Pieces" rules="Click the undefended pieces. Kings can't defend attacked pieces." />
      <SolutionClicker puzzles={puzzles} />
    </div>
  )
}
