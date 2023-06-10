"use client";

// React
import React from "react";

// Components
import { SolutionClicker } from "@/components/SolutionClicker";

// Assets
import checksCaptures from "@/assets/puzzles/checks-captures.json";

// Types
import { Puzzle } from "@/types";

const TITLE = "Checks/Captures";

const RULES =
  "By clicking squares, perform all legal capturs and checks for either side.";

const STORY =
  "Tomorrow the war reaches your small village. Analyze the crawling battlefield to determine where destruction is innevitable.";

console.log(checksCaptures);

export default function Page() {
  const randomPuzzle = () => {
    return (checksCaptures as unknown[])[
      Math.floor(Math.random() * checksCaptures.length)
    ] as Puzzle;
  };

  return (
    <div className="flex flex-col bg-gray-800/50">
      <SolutionClicker
        nextPuzzle={randomPuzzle}
        title={TITLE}
        story={STORY}
        rules={RULES}
        autoAdvance={false}
        solutionType="move"
      />
    </div>
  );
}
