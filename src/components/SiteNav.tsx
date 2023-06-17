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
      <div className="border-b-2 border-amber-300">
      </div>
      <LinkButton href="/games/memorizer">Game Memorizer</LinkButton>
    </div>
  );
}
