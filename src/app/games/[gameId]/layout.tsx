// React
import type React from "react";

// NextJS
import { type Metadata } from "next";
import { notFound } from "next/navigation";

// Styles
import { games, getFlavor } from "@/games";

type HasParams = {
  params: {
    gameId: string;
  };
};

export function generateMetadata({ params: { gameId } }: HasParams): Metadata {
  const game = games[gameId] ?? null;
  if (game == null) {
    return notFound();
  }

  const { rules, title } = game.flavor;

  return {
    title: "Chess Coven - " + title,
    description: rules,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
