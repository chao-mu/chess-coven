import { type Color, type PieceSymbol, type Square } from "chess.js";

import { range } from "@/utils";

export type Game = {
  event: string;
  pgn: string;
};

export type Puzzle = {
  fen: string;
  solutions: Record<string, string>;
  site?: string;
  sequence?: string[];
  fens?: string[];
  highlights?: Square[][];
};

export type SquareInfo = {
  color: Color;
  type: PieceSymbol;
  square: Square;
};

export type Rank = (SquareInfo | null)[];

export type Board = Rank[];

export const EmptyBoard: Board = range(8).map(() => range(8).map(() => null));

export type PlayerStatus =
  | "premature-advancement"
  | "gave-up"
  | "playing"
  | "idle"
  | "wrong-guess"
  | "respawn"
  | "dead";

export type GameStatus = "start" | "playing" | "over";

export type NextPuzzleLogic = (args: { wins: number }) => Promise<Puzzle>;

export type GameInfo = {
  title: string;
  rules: string;
  story: string;
  solutionType: "move" | "square" | "number";
  autoAdvance: boolean;
  noSolution?: boolean;
  isSequence?: boolean;
};
