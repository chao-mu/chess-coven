// React
import React from "react";

// Components
import { SolutionClicker } from "@/components/SolutionClicker";

// Assets
import checkables from "@/assets/puzzles/checkables.json";

const TITLE = "Miserable Kings";

const RULES =
  "Click every piece whose move can result in a check in the current position for either side.";

const STORY =
  "The monarchies of the world have been overthrown by the people. The kings have been imprisoned in their own castles. The people have decided to let the monarchs live, but they must be kept in check.";

export const metadata = {
  title: "Tactical Elements - " + TITLE,
  description: RULES,
};

export default function Page() {
  return (
    <SolutionClicker
      puzzles={checkables}
      title={TITLE}
      story={STORY}
      rules={RULES}
      autoAdvance={false}
      solutionType="square"
    />
  );
}
