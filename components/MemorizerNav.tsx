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

export const MemorizerNav = ({ totalMoves, position, onJump, isRevealed, onRevealToggle }: MemorizerNavProps) => {
  const jumpsBack = [-8, -4, -1];
  const jumpsForward = [1, 4, 8];

  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const jumpRandomForward = () => {
    onJump(random(1, totalMoves - position))
  }

  const jumpRandomBackward = () => {
    if (position == 0) return
    onJump(-random(1, position))
  }

  return (
    <div className="flex gap-2">
      <NavButton onClick={jumpRandomBackward}>
        <div className="whitespace-nowrap">
          «🎲
        </div>
      </NavButton>
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
      <NavButton onClick={jumpRandomForward}>
        🎲»
      </NavButton>
    </div>
  );
};
