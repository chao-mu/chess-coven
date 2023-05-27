// React
import React from "react";

// NextJS
import Link from "next/link";

// Components
import { SiteNav } from "@/components/SiteNav";

// Styles
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-wrap-reverse items-center justify-center p-4">
      <div className="flex-1">
        <div className="flex flex-col items-center p-8">
          <Link
            href="/"
            className="mb-6 whitespace-nowrap font-header text-3xl font-bold text-amber-300"
          >
            Tactical Elements
          </Link>
          <SiteNav />
        </div>
      </div>
      <div className="w-full xl:w-auto">
        <div className="mx-auto max-w-3xl">{children}</div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
