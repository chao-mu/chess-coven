"use client";

// React
import React from "react";

// Components
import { LinkButton } from "@/components/LinkButton";

export function SiteNav() {
  return (
    <div className="flex max-w-2xl flex-col gap-2">
      <LinkButton href="/games/knight-forks">Catapult Knights</LinkButton>
      <LinkButton href="/games/checkables">Miserable Kings</LinkButton>
      <LinkButton href="/games/undefended">The Undefended</LinkButton>
      {/* <LinkButton href="/games/checks-captures">Checks/Captures</LinkButton> */}
      <LinkButton href="/games/memorizer">Game Memorizer</LinkButton>
    </div>
  );
}
