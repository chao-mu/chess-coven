// React
import type React from "react";

// NextJS
import { type Metadata } from "next";
import { notFound } from "next/navigation";

// Styles
import { getFlavor } from "@/games";

type HasParams = {
  params: {
    gameId: string;
  };
};

export function generateMetadata({ params: { gameId } }: HasParams): Metadata {
  const flavor = getFlavor(gameId);
  if (flavor == null) {
    console.log(":-(");
    return notFound();
  }

  const { rules, title } = flavor;

  return {
    title: "Chess Coven - " + title,
    description: rules,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
