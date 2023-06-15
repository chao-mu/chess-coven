// React
import React from "react";

type GameOverScreenProps = {
  finalScore: number;
  previousHighScore: number;
  title: string;
  rules: string;
  onPlayAgain: () => void;
};

export function GameOverScreen({
  finalScore,
  previousHighScore,
  title,
  rules,
  onPlayAgain,
}: GameOverScreenProps) {
  const newHighScore = finalScore > previousHighScore

  return (
    <div className="flex h-full grow items-center justify-center">
      <div className="my-auto flex flex-col items-center justify-center">
        <h1 className="mb-4 w-full text-center font-header text-2xl">{title}</h1>
        <div>
          <div className="text-xl font-bold">Game Over</div>
          <div className="text-lg">Final Score: {finalScore}</div>
          {newHighScore ? (
            <div className="text-lg">New High Score!</div>
          ) : (
            <div className="text-lg">High Score: {previousHighScore}</div>
          )}
        </div>
        <button
          className="m-4 rounded-full bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700"
          onClick={() => onPlayAgain()}
        >
          Play Again
        </button>
        <p className="p-6 text-justify indent-6">{rules}</p>
      </div>
    </div>
  );
}
