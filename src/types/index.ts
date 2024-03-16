// Chess.js
import { type Color, type PieceSymbol, type Square } from "chess.js";

// Zod
import { z } from "zod";

// Ours
import { range } from "@/utils";
import { SquareSchema } from "./squares";

export type Game = {
  event: string;
  pgn: string;
};

export const PuzzleSchema = z.object({
  solutions: z.array(z.union([z.string(), z.number()])),
  solutionAliases: z.record(z.string()),
  site: z.string().nullable(),
  fens: z.array(z.string()),
  highlights: z.array(z.array(SquareSchema)),
});

export const PuzzleCollectionSchema = z.record(
  z.coerce.number(),
  z.array(PuzzleSchema),
);

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

export type GameInfo = {
  flavor: GameFlavor;
  logic: GameLogic;
};

export type GameFlavor = {
  title: string;
  rules: string;
  story: string;
};

export type GameLogic = {
  solutionType: "move" | "square" | "number";
  autoAdvance: boolean;
  noSolution?: boolean;
};

export type Error = {
  success: false;
  error: string;
};

export type Success<T> = {
  success: true;
  data: T;
};

export type GameLevel = {
  puzzles: Puzzle[];
  name: string;
  level?: number;
  nextLevel?: number;
};
