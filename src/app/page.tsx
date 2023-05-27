"use client";

// React
import React from "react";

// Components
import { SiteNav } from "@/components/SiteNav";

export default function Page() {
  return (
    <>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col justify-center gap-8 p-8">
          <div className="flex flex-col gap-4">
            <h1 className="font-header text-6xl font-bold text-amber-300">
              Tactical Elements
            </h1>
            <p className="max-w-2xl text-2xl">
              Survive in the wilderness of Chessimprovia, using your tactical
              wits and board vision to survive
            </p>
          </div>
          <SiteNav />
        </div>
      </div>
    </>
  );
}
