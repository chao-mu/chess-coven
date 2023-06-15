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
  "By clicking squares, perform all legal captures and checks for either side.";

const STORY =
  "Tomorrow the war reaches your small village. Analyze the crawling battlefield to determine where destruction is innevitable.";

export const metadata = {
  title: "Tactical Elements - " + TITLE,
  description: RULES,
};

export default function Page() {
  return (
    <SolutionClicker
      puzzles={checksCaptures as unknown[] as Puzzle[]}
      title={TITLE}
      story={STORY}
      rules={RULES}
      autoAdvance={false}
      solutionType="move"
    />
  );
}
