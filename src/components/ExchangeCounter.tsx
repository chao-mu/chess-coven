"use client";

// Types
import type { PuzzleCollection } from "@/types";

type ExchangeCounterProps = {
  collection: PuzzleCollection;
};

export const ExchangeCounter = ({ collection }: ExchangeCounterProps) => {
  return <div>{collection.title}</div>;
};
