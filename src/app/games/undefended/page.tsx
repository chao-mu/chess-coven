"use client";

// React
import React from 'react'

import { SolutionClicker } from '@/components/SolutionClicker';
import { GameHeader } from '@/components/GameHeader';

import undefendedPieces from '@/assets/puzzles/undefended.json';

export default function Page() {
  return (
    <div className="flex flex-col">
      <GameHeader title="Undefended Pieces" rules="Click the undefended pieces." />
      <SolutionClicker puzzles={undefendedPieces} />
    </div>
  )
}
