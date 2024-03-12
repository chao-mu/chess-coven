// React
import React from "react";

// Components
import { Game } from "@/components/Game";

// Assets
import puzzles from "@/assets/puzzles/undefended.json";

// Game
import { randomPuzzle } from "@/puzzles/util";
import { type GameInfo } from "@/types";

const gameInfo = {
  title: "Enchant the Undefended",
  rules:
    "Click undefended pieces. A piece is considered undefended if there are no allies who have sight on its square.",
  story:
    "The battlefield is littered with fallen chesspersons. Opposing forces clash, blinded by mutual hatred and pricked on by a thirst for blood. There is however a chance for peace. Find the chesspersons who are most vulnerable and pacify them to quell the cycle of violence.",
  solutionType: "square",
  autoAdvance: false,
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
