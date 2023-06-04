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
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 p-4">
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-wrap gap-2 p-2">
          {goodGuesses && goodGuesses.length > 0 && (
            <div className="flex gap-2">
              {goodGuesses.map((guess) => (
                <div className="text-green-500" key={guess}>
                  {guess}
                </div>
              ))}
            </div>
          )}
          {badGuesses && badGuesses.length > 0 && (
            <div className="flex gap-2 line-through">
              {badGuesses.map((guess) => (
                <div className="text-red-500" key={guess}>
                  {guess}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        {playerStatus == "premature-advancement" && (
          <div className="p-2 text-center text-xl font-bold text-amber-400">
            Still more to go!
          </div>
        )}
        {playerStatus != "gave-up" && (
          <button
            className="whitespace-nowrap rounded bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700"
            onClick={onGiveUp}
          >
            Give Up
          </button>
        )}
        {(!autoAdvance || playerStatus == "gave-up") && (
          <button
            className="rounded bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700"
            onClick={onAdvance}
          >
            Advance
          </button>
        )}
      </div>
    </div>
  );
};
