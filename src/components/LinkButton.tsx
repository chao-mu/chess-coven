"use client";

// React
import React from 'react';

// NextJS
import Link from 'next/link';

type LinkButtonProps = {
  href: string
  children: React.ReactNode
}

export const LinkButton = ({ children, href }: LinkButtonProps) => {
  return (
    <Link href={href} className="text-center rounded-full bg-gray-800/50 hover:bg-amber-800/100 py-4 px-6  text-xl text-white">
      { children }
    </Link>
  )
}
