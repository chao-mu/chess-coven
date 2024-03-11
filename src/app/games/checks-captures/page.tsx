// React
import React from "react";

// Components
import { Game } from "@/components/Game";

// Game
import collection from "@/puzzles/checks-captures";

export const metadata = {
  title: "Tactical Elements - " + collection.title,
  description: collection.rules,
};

export default function Page() {
  return <Game collection={collection} />;
}
