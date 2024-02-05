// React
import React from "react";

// Components
import { ExchangeCounter } from "@/components/ExchangeCounter";

// Game
import collection from "@/puzzles/counting";

export const metadata = {
  title: "Tactical Elements - " + collection.title,
  description: collection.rules,
};

export default function Page() {
  return <ExchangeCounter collection={collection} />;
}
