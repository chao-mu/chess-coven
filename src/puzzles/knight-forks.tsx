import { PuzzleCollection } from "@/types";

import puzzles from "@/assets/puzzles/knight-forkables.json";

export default {
  title: "Catapult Knights",
  rules:
    "Click a square that if you were to drop a knight on it, all pieces would be attacked.",
  story:
    "The king and queen of the enemy army think they're safe chilling at the local outdoor pub. Catapult a knight across the kingdom (it's a Tactical Elements brand catapult) and cause mayhem!",
  autoAdvance: true,
  solutionType: "square",
  puzzles: puzzles,
  noSolution: true,
} as PuzzleCollection;
