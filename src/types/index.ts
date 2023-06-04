import { Color, PieceSymbol, Square } from "chess.js";

export type Game = {
  event: string;
  pgn: string;
};

export type Puzzle = {
  fen: string;
  solution: string[];
  solutionAliases?: Record<string, string>;
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
  | "wrong-guess";
