"use client"

// React
import React from "react";
import { useState } from "react";

// chess.js
import { Chess } from "chess.js";

// Assets
import games from "@/assets/games.json";

// Components
import { MemorizerNav } from "./MemorizerNav";
import { Chessboard } from "./Chessboard";
import { SanInputForm } from "./SanInputForm";

// Types
import { Game } from "@/types"

import { GameSelect } from "@/components/GameSelect";

const getChess = (pgn: string, position: number) => {
  const chess = new Chess();
  chess.loadPgn(pgn);
  const moves = chess.history();
  chess.reset();

  for (let i = 0; i < position; i++) {
    chess.move(moves[i]);
  }

  return {
    fen: chess.fen(),
    isLastPosition: position >= moves.length,
    chess: chess,
    moves: moves,
  }
}


export const GameMemorizer = () => {
  const [position, setPosition] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [game, setGame] = useState<Game>(games[0]);

  const { fen, isLastPosition, moves } = getChess(game.pgn, position)

  function onJump(steps: number) {
    setPosition((p) => Math.min(moves.length, Math.max(0, p + steps)));
  }

  function onGuess(san: string) {
    const { chess, isLastPosition } = getChess(game.pgn, position)
    if (isLastPosition) {
      return false
    }

    const { fen: chessSolution } = getChess(game.pgn, position + 1)

    try {
      chess.move(san);
    } catch (e) {
      setIsWrong(true);
      return false;
    }

    const isCorrect = chess.fen() == chessSolution
    setIsWrong(!isCorrect);
    if (isCorrect) {
      onJump(1);
    }

    return isCorrect
  }

  return (
    <div className="flex h-[95vh] min-w-[33vw]  flex-col bg-gray-800/50">
      <div className="m-2 text-center font-header text-2xl font-bold">Game Memorizer</div>
      <GameSelect setGame={setGame} games={games} />
      <Chessboard movable fen={fen} onMove={onGuess} />
      <div className="mt-1 flex justify-center">
        <MemorizerNav
          totalMoves={moves.length}
          position={position}
          onJump={onJump}
          isRevealed={isRevealed}
          onRevealToggle={(revealed: boolean) => {
            if (revealed) {
              setIsWrong(false);
            }
            setIsRevealed(revealed);
          }}
        />
      </div>
      <div className="flex h-24 flex-col justify-center pb-2">
        {isLastPosition ? (
          <div className="text-center text-lg font-bold">
            🎉 End of game! 🎉
          </div>
        ) : isRevealed ? (
          <div className="flex items-center justify-center">
            <div className="flex text-lg">
              <div className="mr-2">Continuation</div>
              <div>{moves[position]}</div>
            </div>
          </div>
        ) : (
          <SanInputForm onSubmit={onGuess} isWrong={isWrong} />
        )}
      </div>
    </div>
  );
};
