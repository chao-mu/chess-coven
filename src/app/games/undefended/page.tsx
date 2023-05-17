"use client";

// React
import React from 'react'

import { SolutionClicker } from '@/components/SolutionClicker';
import undefendedPieces from '@/assets/puzzles/undefended.json';

export default function Page() {
  return (
    <SolutionClicker
      puzzles={undefendedPieces}
      title="Click Undefended"
      rules="Kings can't defend attacked squares."
    />
  )
}
