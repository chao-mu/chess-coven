"use client";

// React
import React from 'react';

// NextJS
import Link from 'next/link';

// Components
import { NavSquare } from '@/components/NavSquare';

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-6xl font-bold font-header text-center mb-4 mt-8">Tactical Elements</h1>
      <div className="flex flex-col gap-4">
        <Link href="/games/undefended">
          <NavSquare
            title="Undefended"
            description="Click the undefended chessmen. Kings can't defend attacked pieces."
          />
        </Link>
        { /*
        <Link href="/games/attackers">
          <NavSquare
            title="Attackers"
            description="Click the chessmen that attack a major or minor piece."
          />
        </Link>
        */ }
        <Link href="/games/memorizer">
          <NavSquare
            title="Game Memorizer"
            description="Study and memorize chess games, specifying continuations in short algebraic notation"
          />
        </Link>
      </div>
    </div>
  )
}
