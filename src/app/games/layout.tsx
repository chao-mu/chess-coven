// React
import React from 'react'

// NextJs
import Link from 'next/link'

import '@/app/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center text-header text-white text-3xl font-bold bg-lime-600 p-4">
        <Link href="/">
          Tactical Elements
        </Link>
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}
