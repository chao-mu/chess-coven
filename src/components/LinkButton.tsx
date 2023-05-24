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
    <Link href={href} className="rounded-full bg-gray-800/50 px-6 py-4 text-center text-xl  text-white hover:bg-amber-800/100">
      { children }
    </Link>
  )
}
