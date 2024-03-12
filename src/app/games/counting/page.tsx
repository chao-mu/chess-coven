// React
import React from "react";

// Components
import { Game } from "@/components/Game";

// Types
import type { GameInfo, Puzzle } from "@/types";

// Game
import puzzles from "@/assets/puzzles/counting.json";
import { randomPuzzle } from "@/puzzles/util";

const gameInfo = {
  title: "Count Capture Points",
  rules:
    "Watch the animation and determine the final change in material difference after all captures, using relative piece values. Captures of Pawns are worth 1 point, Knights and Bishops are worth 3 points, Rooks are worth 5 points, and Queens are worth 9 points. For example, if a pawn captures a knight and then the pawn is captured, the answer would be 2. If a queen captures a pawn and a pawn takes back, the total is -8",
  story:
    "The death toll from the war increases every day. The war has gone on far too long and soon will be the mutual ruin of both kingdoms. You must prepare a PowerPoint slide presentation to convince the ruling monarchs that peace is the best option.",
  autoAdvance: true,
  solutionType: "number",
  noSolution: false,
} satisfies GameInfo;

async function nextPuzzle() {
  "use server";

  return randomPuzzle(puzzles as unknown as Puzzle[]);
}

export const metadata = {
  title: "Tactical Elements - " + gameInfo.title,
  description: gameInfo.rules,
};

export default function Page() {
  return <Game gameInfo={gameInfo} nextPuzzle={nextPuzzle}/>;
}
