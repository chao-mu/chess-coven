import { Color, PieceSymbol, Square } from "chess.js";

export type Game = {
  event: string;
  pgn: string;
};

export type Puzzle = {
  fen: string;
  solutions: { [key: string]: string };
  site?: string;
};

export type SquareInfo = {
  color: Color;
  type: PieceSymbol;
  square: Square;
};

export type Rank = (SquareInfo | null)[];

export type Board = Rank[];

export const EmptyBoard: Board = Array(8).fill(Array(8).fill(null));

export type PlayerStatus =
  | "premature-advancement"
  | "gave-up"
  | "playing"
  | "idle"
  | "wrong-guess"
  | "respawn"
  | "dead";

export type PuzzleCollection = {
  title: string;
  rules: string;
  story: string;
  solutionType: "move" | "square" | "number";
  puzzles: Puzzle[];
  autoAdvance: boolean;
  noSolution: boolean;
};
