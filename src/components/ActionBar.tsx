// React")e
import React from "react";

// Types
import { PlayerStatus } from "@/types";

// Components
import { SanInputForm } from "@/components/SanInputForm";

export type ActionBarProps = {
  playerStatus: PlayerStatus;
  autoAdvance: boolean;
  onAdvance?: () => void;
  onGiveUp?: () => void;
  onSanEntry: (san: string) => void;
  sanEntry: boolean;
};

export const ActionBar = ({
  autoAdvance,
  playerStatus,
  onGiveUp,
  onAdvance,
  onSanEntry,
  sanEntry = false,
}: ActionBarProps) => {
  return (
    <div className="flex items-start justify-center gap-4 flex-wrap">
      {sanEntry && (
        <SanInputForm
          onSubmit={onSanEntry}
          isWrong={playerStatus == "wrong-guess"}
        />
      )}
      {playerStatus == "premature-advancement" && (
        <div className="p-2 text-center text-xl font-bold text-amber-400">
          Still more to go!
        </div>
      )}
      {playerStatus != "gave-up" && (
        <button
          className="rounded whitespace-nowrap bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700"
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
