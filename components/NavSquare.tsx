"use client";

// React
import React from 'react';

type NavSquareProps = {
  title: string
  description: string
  onClick?: () => void
}

export const NavSquare = ({ title, description, onClick }: NavSquareProps) => {
  return (
    <button onClick={onClick} className="flex items-center bg-purple-500 text-white py-4 px-5 hover:cursor-pointer hover:bg-purple-600 flex flex-col gap-2">
      <div className="font-bold text-2xl font-header">
        {title}
      </div>
      <div className="text-xl ml-2 font-body">
        {description}
      </div>
    </button>
  )
}
