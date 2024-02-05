import type { PuzzleCollection, Puzzle } from "@/types";

import puzzles from "@/assets/puzzles/counting.json";

export default {
  title: "Count Exchange Totals",
  rules:
    "Watch the animation and determine the final value of the exchange, using relative piece values. Captures of Pawns are worth 1 point, Knights and Bishops are worth 3 points, Rooks are worth 5 points, and Queens are worth 9 points.",
  story:
    "The death toll from the war increases every day. The war has gone on far too long and soon will be the mutual ruin of both kingdoms. You must prepare a PowerPoint slide presentation to convince the ruling monarchs that peace is the best option.",
  autoAdvance: true,
  solutionType: "number",
  puzzles: puzzles as unknown as Puzzle[],
  noSolution: false,
} as PuzzleCollection;
