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
    <div className="flex size-full flex-col flex-wrap items-center justify-center gap-4">
      <div className="p-2 text-4xl">Incorrect!</div>
      <div className="flex gap-2">
        <button
          onClick={tryAgain}
          type="submit"
          className="border-2 border-amber-600 bg-gray-800 p-2 text-lg"
        >
          Try Again
        </button>
        <button
          onClick={showSolutions}
          type="submit"
          className="border-2 border-amber-600 bg-gray-800 p-2 text-lg"
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
