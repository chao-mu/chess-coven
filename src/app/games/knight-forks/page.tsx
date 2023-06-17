// React
import React from "react";

// Components
import { SolutionClicker } from "@/components/SolutionClicker";

// Game
import collection from "@/puzzles/knight-forks"

export const metadata = {
  title: "Tactical Elements - " + collection.title,
  description: collection.rules,
};

export default function Page() {
  return (
    <SolutionClicker collection={collection} />
  );
}
