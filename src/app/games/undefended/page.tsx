"use client";

// React
import React from 'react'

import { SolutionClicker } from '@/components/SolutionClicker';
import undefendedPieces from '@/assets/puzzles/undefended.json';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-3xl grow">
            <SolutionClicker
              puzzles={undefendedPieces}
              title="Click Undefended"
              rules="Kings can't defend attacked squares."
            />
        </div>
    </div>
  )
}
