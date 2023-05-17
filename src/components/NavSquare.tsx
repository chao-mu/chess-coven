"use client";

// React
import React from 'react';

type NavSquareProps = {
  title: string
  description: string
}

export const NavSquare = ({ title, description }: NavSquareProps) => {
  return (
    <div className="flex items-center w-full h-full bg-purple-500 py-4 px-5 hover:cursor-pointer hover:bg-purple-600 flex flex-col gap-2">
      <div className="font-bold text-2xl font-header">
        {title}
      </div>
      <div className="text-xl font-body">
        {description}
      </div>
    </div>
  )
}
