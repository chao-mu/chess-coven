// React
import React from 'react'

import './globals.css'

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
      <body className="font-body bg-gradient-to-r from-gray-950 text-white to-lime-800">
        <div className="flex flex-col justify-center items-center min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
