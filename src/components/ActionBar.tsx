// React")e
import React from "react";

// Types
import { PlayerStatus } from "@/types";

export type ActionBarProps = {
  playerStatus: PlayerStatus;
  autoAdvance: boolean;
  onAdvance?: () => void;
  onGiveUp?: () => void;
};

export const ActionBar = ({
  autoAdvance,
  playerStatus,
  onGiveUp,
  onAdvance,
}: ActionBarProps) => {
  return (
    <div className="flex justify-center gap-4">
      {playerStatus == "premature-advancement" && (
        <div className="p-2 text-center text-xl font-bold text-amber-400">
          Still more to go!
        </div>
      )}
      {playerStatus != "gave-up" && (
        <button
          className="rounded bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700"
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
  );
};
