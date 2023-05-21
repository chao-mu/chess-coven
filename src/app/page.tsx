"use client";

// React
import React from 'react';

// NextJS
import Link from 'next/link';

// Components
import { SiteNav } from '@/components/SiteNav';

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center gap-8 p-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-bold font-header text-amber-300">Tactical Elements</h1>
          <p className="text-2xl max-w-2xl">Survive in the wilderness of Chessimprovia, using your tactical wits and board vision to survive</p>
        </div>
        <SiteNav />
      </div>
    </div>
  )
}
