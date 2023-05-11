// React
import React  from 'react';

// Components
import { NavButton } from './NavButton';

type MemorizerNavProps = {
  totalMoves: number
  position: number
  onJump: (steps: number) => void
  onRevealToggle: (revealed: boolean) => void
  isRevealed: boolean
}

export const MemorizerNav = ({ onJump, isRevealed, onRevealToggle }: MemorizerNavProps) => {
  const jumpsBack = [-8, -4, -1];
  const jumpsForward = [1, 4, 8];

  return (
    <div className="flex gap-2">
      {jumpsBack.map((jump) => (
        <NavButton key={jump} onClick={() => onJump(jump)}>
          «{Math.abs(jump)}
        </NavButton>
      ))}
      <NavButton onClick={() => {onRevealToggle(!isRevealed)}}>
        {isRevealed ? '😔' : '👁️'}
      </NavButton>
      {jumpsForward.map((jump) => (
        <NavButton key={jump} onClick={() => onJump(jump)}>
          {jump}»
        </NavButton>
      ))}
    </div>
  );
};
