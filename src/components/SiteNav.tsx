"use client";

// React
import React from "react";

// Components
import { LinkButton } from "@/components/LinkButton";

export function SiteNav() {
  return (
    <div className="flex flex-col gap-2">
      <LinkButton href="/games/knight-forks">Knight Forks</LinkButton>
      <LinkButton href="/games/checks-captures">Checks/Captures</LinkButton>
      <LinkButton href="/games/undefended">Undefended Pieces</LinkButton>
      <LinkButton href="/games/counting">Count Exchange Totals</LinkButton>
      <div className="min-h-0 border-b-2 border-amber-300"></div>
      <LinkButton href="/games/memorizer">Game Memorizer</LinkButton>
      <LinkButton href="https://www.patreon.com/user?u=84821837">
        Help Cover Costs
      </LinkButton>
    </div>
  );
}
