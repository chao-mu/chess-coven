"use client";

// React
import React from "react";

// Components
import { SolutionClicker } from "@/components/SolutionClicker";

// Assets
import forkables from "@/assets/puzzles/knight-forkables.json";

const TITLE = "Catapult Knights";

const RULES =
  "Click squares that would create a knight fork. In other words, click all squares that are a knight distance from both the king and queen.";

const STORY =
  "The king and queen of the enemy army think they're safe chilling at the local outdoor pub. Catapult a knight across the kingdom (it's a Tactical Elements brand catapult) and cause mayhem!";

export default function Page() {
  const randomPuzzle = () =>
    forkables[Math.floor(Math.random() * forkables.length)];
  return (
    <SolutionClicker
      nextPuzzle={randomPuzzle}
      title={TITLE}
      story={STORY}
      rules={RULES}
      autoAdvance={true}
      solutionType="square"
    />
  );
}
