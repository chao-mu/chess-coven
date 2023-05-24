"use client";

// React
import React from 'react';

// Components
import { LinkButton } from '@/components/LinkButton';

export function SiteNav() {
  return (
    <div className="flex max-w-2xl flex-col gap-2">
      <LinkButton href="/games/undefended">
        Enchant the Undefended
      </LinkButton>
      <LinkButton href="/games/memorizer">
        Memorize Games
      </LinkButton>
      <LinkButton href="https://lichess.org/@/bestieboots">
        Find me on Lichess
      </LinkButton>
      <LinkButton href="https://github.com/chao-mu/tactical-elements">
        Source Code
      </LinkButton>
    </div>
  )
}
