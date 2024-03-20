import { GameHUD } from "./GameHUD";

type IncorrectScreenProps = {
  tryAgain: () => void;
  showSolutions: () => void;
  currentScore: number;
  health: number;
  highScore: number;
  maxHealth: number;
};

export function IncorrectScreen({
  tryAgain,
  showSolutions,
  maxHealth,
  currentScore,
  highScore,
  health,
}: IncorrectScreenProps) {
  return (
    <div className="size-full flex flex-col gap-4 flex-wrap items-center justify-center">
      <div className="text-4xl p-2">Incorrect!</div>
      <div className="flex gap-2">
        <button
          onClick={tryAgain}
          type="submit"
          className="border-2 border-amber-600 p-2 text-lg bg-gray-800"
        >
          Try Again
        </button>
        <button
          onClick={showSolutions}
          type="submit"
          className="border-2 border-amber-600 p-2 text-lg bg-gray-800"
        >
          Show Solutions
        </button>
      </div>
      <GameHUD
        score={currentScore}
        health={health}
        highScore={highScore}
        maxHealth={maxHealth}
      />
    </div>
  );
}
