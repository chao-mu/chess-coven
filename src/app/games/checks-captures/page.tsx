"use client";

// React
import React from "react";

// Components
import { SolutionClicker } from "@/components/SolutionClicker";

// Assets
import checksCaptures from "@/assets/puzzles/checks-captures.json";

const TITLE = "Checks/Captures";

const RULES =
  "Specify all legal moves for either side that would result in a capture of a major or minor piece (i.e. non-pawns) or check.";

const STORY =
  "Tomorrow the war reaches your small village. Analyze the crawling battlefield to determine where destruction is innevitable.";

export default function Page() {
  const randomPuzzle = () =>
    checksCaptures[Math.floor(Math.random() * checksCaptures.length)];

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
