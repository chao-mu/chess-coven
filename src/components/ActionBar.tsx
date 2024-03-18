// React
import React from "react";

// Components
import { NumberEntryForm } from "@/components/NumberEntryForm";

// Types
import type { PlayerStatus, SolutionType } from "@/types";

export type ActionBarProps = {
  playerStatus: PlayerStatus;
  autoAdvance: boolean;
  sanEntry: boolean;
  allowNoSolution: boolean;
  pulseNoSolution: boolean;
  onAdvance?: () => void;
  onGiveUp?: () => void;
  onSanEntry: (san: string) => void;
  onContinue?: () => void;
  onNumberEntry?: (number: number) => void;
  onReplayAnimation?: () => void;
  solutionType: SolutionType;
};

export const ActionBar = ({
  autoAdvance,
  playerStatus,
  allowNoSolution,
  solutionType,
  pulseNoSolution = false,
  onGiveUp,
  onAdvance,
  onNumberEntry,
  onReplayAnimation,
}: ActionBarProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-1">
        {(!autoAdvance || playerStatus == "gave-up") && (
          <button
            onClick={onAdvance}
            className="rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-700"
          >
            Advance
          </button>
        )}
        {playerStatus != "gave-up" && (
          <>
            {allowNoSolution && (
              <button
                className={`${
                  pulseNoSolution ? "animate-pulse" : ""
                } rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-700`}
                onClick={onAdvance}
              >
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
      {onReplayAnimation && (
        <button
          className="rounded bg-amber-600 px-2 py-1 font-bold text-white hover:bg-amber-700"
          onClick={onReplayAnimation}
        >
          Replay
        </button>
      )}
      {solutionType == "number" && onNumberEntry && (
        <div className="mx-auto">
          <NumberEntryForm
            label="Total value"
            onSubmit={onNumberEntry}
            isWrong={playerStatus == "wrong-guess"}
          />
        </div>
      )}
      {playerStatus == "premature-advancement" && (
        <div className="flex items-center justify-center pr-6 font-bold text-amber-400">
          Still more to go!
        </div>
      )}
    </div>
  );
};
