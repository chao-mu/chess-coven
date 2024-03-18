// React
import React from "react";

// Components
import { GameMemorizer } from "@/components/GameMemorizer";

export const metadata = {
  title: "Chess Coven - Game Memorizer",
  description: "Quiz your knowledge of Dojo games to memorize.",
};

export default function MemorizerPage() {
  return <GameMemorizer />;
}
