"use client";

// React
import React from 'react';

// Components
import { LinkButton } from '@/components/LinkButton';

export function SiteNav() {
  return (
    <div className="flex flex-col gap-2 max-w-2xl">
      <LinkButton href="/games/undefended">
        Enchant the Undefended
      </LinkButton>
      <LinkButton href="/games/memorizer">
        Memorize Games
      </LinkButton>
      <LinkButton href="https://lichess.org/@/bestieboots">
        Find me on Lichess
      </LinkButton>
    </div>
  )
}
