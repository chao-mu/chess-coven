// React
import React from 'react';

type NavButtonProps = {
  text?: string | number
  children?: React.ReactNode
  onClick?: () => void
};

export const NavButton = ({ text, onClick, children }: NavButtonProps) => {
  return (
    // Text in center of circle
    <button onClick={onClick} className="flex items-center bg-purple-500 text-lg font-bold py-4 px-5 font-mono hover:cursor-pointer hover:bg-purple-600">
        {children || text}
    </button>
  );
};
