// React")e
import React from "react";

// Types
import { PlayerStatus } from "@/types";

export type ActionBarProps = {
  playerStatus: PlayerStatus;
  autoAdvance: boolean;
  onAdvance?: () => void;
  onGiveUp?: () => void;
  onSanEntry: (san: string) => void;
  sanEntry: boolean;
  goodGuesses?: string[];
  badGuesses?: string[];
  onContinue?: () => void;
};

export const ActionBar = ({
  autoAdvance,
  playerStatus,
  onGiveUp,
  onAdvance,
  goodGuesses = [],
  badGuesses = [],
}: ActionBarProps) => {
  const showGuesses =
    (goodGuesses && goodGuesses.length > 0) ||
    (badGuesses && badGuesses.length > 0);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-1">
        {(!autoAdvance || playerStatus == "gave-up") && (
          <button
            className="rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-700"
            onClick={onAdvance}
          >
            Advance
          </button>
        )}
        {playerStatus != "gave-up" && (
          <button
            className="whitespace-nowrap rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-700"
            onClick={onGiveUp}
          >
            Give Up
          </button>
        )}
      </div>
      {playerStatus == "premature-advancement" && (
        <div className="flex items-center justify-center font-bold text-amber-400 pr-6">
          Still more to go!
        </div>
      )}
    </div>
  );
};
