// React
import React from 'react'

// NextJS
import Link from 'next/link'

// Components
import { SiteNav } from '@/components/SiteNav'

// Styles
import '@/app/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap-reverse justify-center items-center p-4 min-h-screen">
      <div className="flex-1">
        <div className="p-8 flex flex-col items-center">
          <Link href="/" className="text-3xl font-bold font-header text-amber-500 mb-6 whitespace-nowrap">Tactical Elements</Link>
          <SiteNav />
        </div>
      </div>
      <div className="w-full xl:w-auto">
        <div className="max-w-3xl mx-auto">
          { children }
        </div>
      </div>
      <div className="flex-1">
      </div>
    </div>
  )
}
