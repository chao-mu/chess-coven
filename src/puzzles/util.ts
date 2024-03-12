import { Puzzle } from "@/types";

export function randomPuzzle<T extends Puzzle>(puzzles: T[]): Puzzle {
    return puzzles[Math.floor(Math.random() * puzzles.length)];
};
