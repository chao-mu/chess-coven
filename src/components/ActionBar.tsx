// React")e
import React from "react";

// Types
import { PlayerStatus } from "@/types";

export type ActionBarProps = {
  playerStatus: PlayerStatus;
  autoAdvance: boolean;
  sanEntry: boolean;
  allowNoSolution: boolean;
  onAdvance?: () => void;
  onGiveUp?: () => void;
  onSanEntry: (san: string) => void;
  onContinue?: () => void;
};

export const ActionBar = ({
  autoAdvance,
  playerStatus,
  allowNoSolution,
  onGiveUp,
  onAdvance,
}: ActionBarProps) => {
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
          <>
            {allowNoSolution && (
              <button
                className="rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-700"
                onClick={onAdvance}>
                No Solution
              </button>
            )}
            <button
              className="whitespace-nowrap rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-700"
              onClick={onGiveUp}
            >
              Give Up
            </button>
          </>
        )}
      </div>
      {playerStatus == "premature-advancement" && (
        <div className="flex items-center justify-center pr-6 font-bold text-amber-400">
          Still more to go!
        </div>
      )}
    </div>
  );
};
