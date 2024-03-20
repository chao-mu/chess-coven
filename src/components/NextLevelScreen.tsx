import { GameHUD } from "./GameHUD";

type IncorrectScreenProps = {
  onContinue: () => void;
  levelName: string;
  currentScore: number;
  health: number;
  highScore: number;
  maxHealth: number;
};

export function LevelClearScreen({
  onContinue,
  levelName,
  maxHealth,
  currentScore,
  highScore,
  health,
}: IncorrectScreenProps) {
  return (
    <div className="size-full flex flex-col gap-4 flex-wrap items-center justify-center">
      <div className="text-4xl p-2">Level clear! Next up {levelName}</div>
      <div className="flex gap-2">
        <button
          onClick={onContinue}
          className="rounded mt-2 bg-amber-600 self-center px-6 py-2 text-white hover:bg-amber-700"
        >
          Continue
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
