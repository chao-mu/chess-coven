// React
import React from "react";

type GameOverScreenProps = {
  finalScore: number;
  previousHighScore: number;
  title: string;
  rules: string;
  onBack: () => void;
  onPlayAgain: () => void;
};

export function GameOverScreen({
  finalScore,
  previousHighScore,
  title,
  rules,
  onBack,
  onPlayAgain,
}: GameOverScreenProps) {
  const newHighScore = finalScore > previousHighScore

  return (
    <div className="flex h-full grow items-center justify-center">
      <div className="my-auto flex flex-col items-center justify-center gap-2">
        <div className="p-6 text-4xl font-bold">Game Over</div>
        <div className="w-full text-center font-header text-2xl">{title}</div>
        <p className="px-6 text-justify indent-6">{rules}</p>
        <div>
          <div className="text-lg">Final Score: {finalScore}</div>
          {newHighScore ? (
            <div className="text-lg">New High Score!</div>
          ) : (
            <div className="text-lg">High Score: {previousHighScore}</div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-full bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700"
            onClick={() => onBack()}
          >
            Back
          </button>
          <button
            className="rounded-full bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700"
            onClick={() => onPlayAgain()}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
