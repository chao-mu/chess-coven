// React
import React from "react";

// Components
import { Heart } from "@/components/Heart";

type GameHUDProps = {
  maxHealth: number
  health: number
  score: number
  highScore: number
}


export const GameHUD = ({
  maxHealth,
  health,
  score,
  highScore
}: GameHUDProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 px-4 pb-2">
      <div>Score: {score}</div>
      <div>High Score: {highScore}</div>
      <div className="flex flex-wrap gap-2">
        {[...Array(maxHealth)].map((_, index) => (
          <Heart key={index} full={index < health} />
        ))}
      </div>
    </div>

  );
};
