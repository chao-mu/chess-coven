// React
import type React from "react";

// NextJS
import { type Metadata } from "next";
import { notFound } from "next/navigation";

// Styles
import { getFlavor } from "@/puzzles/flavor";

type HasParams = {
  params: {
    id: string;
  };
};

export function generateMetadata({ params: { id } }: HasParams): Metadata {
  const flavor = getFlavor(id);
  if (flavor == null) {
    return notFound();
  }

  const { rules, title } = flavor;

  return {
    title: "Tactical Elements - " + title,
    description: rules,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
