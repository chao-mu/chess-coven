// React
import React from "react";

type GameOverScreenProps = {
  finalScore: number;
  newHighScore: boolean;
  onPlayAgain: () => void;
};

export function GameOverScreen({
  finalScore,
  newHighScore,
  onPlayAgain,
}: GameOverScreenProps) {
  return (
    <div className="flex aspect-square items-center justify-center">
      <div className="flex flex-col items-start">
        <div className="mb-4 text-3xl font-bold">Game Over!</div>
        <div className="mb-2 text-2xl">Final Score: {finalScore}</div>
        {newHighScore && <div className="mb-2 text-2xl">New High Score!</div>}
        <button
          className="rounded-full bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700"
          onClick={() => onPlayAgain()}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
