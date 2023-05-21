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
    <div className="flex flex-col bg-gray-800/50">
      <SolutionClicker puzzles={puzzles} title="Enchant the Undefended" story="The battlefield is littered with fallen chesspersons. Opposing forces clash, blinded by mutual hatred and pricked on by a thirst for blood. There is however a chance for peace. Find the chesspersons who are most vulnerable and pacify them to quell the cycle of violence." rules="Click undefended pieces and pawns. Kings can't defend attacked squares." />
    </div>
  )
}
