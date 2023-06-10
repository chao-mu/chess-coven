"use client";

// React
import React from "react";
import { useState } from "react";

// Types
import { Game } from "@/types";

// Assets
import games from "@/assets/games.json";

// Components
import { GameMemorizer } from "@/components/GameMemorizer";
import { GameSelect } from "@/components/GameSelect";

export default function MemorizerPage() {
  const [game, setGame] = useState<Game>(games[0]);

  return (
    <div className="flex flex-col bg-gray-800/50">
      <div className="m-2 text-center text-2xl font-bold">Game Memorizer</div>
      <div className="p-2 pt-1">
        <GameSelect setGame={setGame} games={games} />
      </div>
      <GameMemorizer pgn={game.pgn} />
    </div>
  );
}
