import { PuzzleCollection } from '@/types';

import puzzles from '@/assets/puzzles/checks-captures.json';

import { Puzzle } from '@/types';

export default {
  title: "Checks/Captures",
  rules: "By clicking squares, perform all legal captures and checks for either side.",
  story: "Tomorrow the war reaches your small village. Analyze the crawling battlefield to determine where destruction is innevitable.",
  autoAdvance: false,
  solutionType: "move",
  puzzles: puzzles as unknown as Puzzle[],
  noSolution: false,
} as PuzzleCollection;
