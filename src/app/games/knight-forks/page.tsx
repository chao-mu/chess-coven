// React
import React from "react";

// Components
import { Game } from "@/components/Game";

// Game
import puzzles from "@/assets/puzzles/knight-forkables.json";
import { randomPuzzle } from "@/puzzles/util";
import { type GameInfo } from "@/types";

const gameInfo = {
  title: "Catapult Knights",
  rules:
    "Click a square that if you were to drop a knight on it, all pieces would be attacked. Otherwise click No Solution.",
  story:
    "The king and queen of the enemy army think they're safe chilling at the local outdoor pub. Catapult a knight across the kingdom (it's a Tactical Elements brand catapult) and cause mayhem!",
  autoAdvance: true,
  solutionType: "square",
  noSolution: true,
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
