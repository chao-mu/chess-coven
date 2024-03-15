import { type Color, type PieceSymbol, type Square } from "chess.js";

import { range } from "@/utils";

import { z } from "zod";

export type Game = {
  event: string;
  pgn: string;
};

const SquareSchema = z.string().refine((v) => /^[a-h][1-8]$/.test(v));

export const PuzzleSchema = z.object({
  solutions: z.array(z.union([z.string(), z.number()])),
  solutionAliases: z.record(z.string()),
  site: z.string().nullable(),
  fens: z.array(z.string()),
  highlights: z.array(z.array(SquareSchema)),
});
export const PuzzleCollectionSchema = z.array(PuzzleSchema);

export type PuzzleCollection = z.infer<typeof PuzzleCollectionSchema>;

export type Puzzle = z.infer<typeof PuzzleSchema>;

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

export type GameFlavor = {
  title: string;
  rules: string;
  story: string;
};

export type GameLogic = {
  solutionType: "move" | "square" | "number";
  autoAdvance: boolean;
  noSolution?: boolean;
  isSequence?: boolean;
};
