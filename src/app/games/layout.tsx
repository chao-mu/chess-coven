// React
import React from "react";

// NextJS
import Link from "next/link";

// Components
import { SiteNav } from "@/components/SiteNav";

// Styles
import "@/app/globals.css";
import { GameContainer } from "@/components/GameContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex justify-center items-center">
      <div className="flex-1 flex flex-col items-center">
        <Link
          href="/"
          className="mb-2 whitespace-nowrap font-header text-2xl font-bold text-amber-300"
        >
          Chess Coven
        </Link>
        <SiteNav />
      </div>
      {children}
      <div className="flex-1" />
    </main>
  );
}
