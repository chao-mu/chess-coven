// React
import React from "react";

// react icons
import {
  FaAngleLeft,
  FaAngleRight,
  FaDice,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

// Components
import { NavButton } from "./NavButton";

type MemorizerNavProps = {
  totalMoves: number;
  position: number;
  onJump: (steps: number) => void;
  onRevealToggle: (revealed: boolean) => void;
  isRevealed: boolean;
};

export const MemorizerNav = ({
  totalMoves,
  position,
  onJump,
  isRevealed,
  onRevealToggle,
}: MemorizerNavProps) => {
  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const jumpRandomForward = () => {
    onJump(random(1, totalMoves - position));
  };

  const jumpRandomBackward = () => {
    if (position == 0) return;
    onJump(-random(1, position));
  };

  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex justify-between gap-2">
        <NavButton onClick={() => onJump(-position)}>
          <FaAngleDoubleLeft />
        </NavButton>
        <NavButton onClick={jumpRandomBackward}>
          <FaDice />
        </NavButton>
        <NavButton onClick={() => onJump(-1)}>
          <FaAngleLeft />
        </NavButton>
        <NavButton
          onClick={() => {
            onRevealToggle(!isRevealed);
          }}
        >
          {isRevealed ? "hide" : "show"}
        </NavButton>
      </div>
      <div className="flex justify-between gap-2">
        <NavButton onClick={() => onJump(1)}>
          <FaAngleRight />
        </NavButton>
        <NavButton onClick={jumpRandomForward}>
          <FaDice />
        </NavButton>
        <NavButton onClick={() => onJump(totalMoves)}>
          <FaAngleDoubleRight />
        </NavButton>
      </div>
    </div>
  );
};
