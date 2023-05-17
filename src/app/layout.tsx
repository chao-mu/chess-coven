// React
import React from 'react'

import '@/app/globals.css'

export const metadata = {
  title: 'Tactical Elements',
  description: 'Chess learning tools and games'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-body  min-h-screen bg-gray-950 text-white">
        {children}
      </body>
    </html>
  )
}
