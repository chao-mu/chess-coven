// React
import React from "react";

// Components
import { Game } from "@/components/Game";

// Assets
import puzzles from "@/assets/puzzles/checks-captures.json";


import { randomPuzzle } from "@/puzzles/util";
import { GameInfo } from "@/types";

const gameInfo = {
  title: "Checks/Captures",
  rules:
    "By clicking squares, perform all legal captures and checks for either side.",
  story:
    "Tomorrow the war reaches your small village. Analyze the crawling battlefield to determine where destruction is innevitable.",
  autoAdvance: false,
  solutionType: "move",
  noSolution: false,
} satisfies GameInfo;

export const metadata = {
  title: "Tactical Elements - " + gameInfo.title,
  description: gameInfo.rules,
};

async function nextPuzzle() {
  "use server";

  return randomPuzzle(puzzles);
}

export default function Page() {
  return <Game gameInfo={gameInfo} nextPuzzle={nextPuzzle} />;
}
