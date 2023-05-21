"use client";

// React
import React from 'react';

// Components
import { LinkButton } from '@/components/LinkButton';

export function SiteNav() {
  return (
    <div className="flex flex-col gap-2 max-w-2xl">
      <LinkButton
        href="/games/undefended"
        description="Train your pattern recognition by clicking undefneded chessman. Kings can't defend attacked pieces."
      >
        Enchant the Undefended
      </LinkButton>
      <LinkButton href="/games/memorizer"
        description="Study and memorize chess games, specifying continuations in short algebraic notation"
      >
        Memorize Games
      </LinkButton>

      <LinkButton href="https://lichess.org/@/bestieboots"
        description="Have a suggestion? Want to play a game? Contact me on Lichess."
      >
        Find me on Lichess
      </LinkButton>
    </div>
  )
}
