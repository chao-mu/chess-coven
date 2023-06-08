// React
import React from "react";
import { useState, useEffect } from "react";

// chess.js
import { Chess } from "chess.js";

// Components
import { MemorizerNav } from "./MemorizerNav";
import { Chessboard } from "./Chessboard";
import { SanInputForm } from "./SanInputForm";

type GameMemorizerProps = {
  pgn: string;
};

export const GameMemorizer = ({ pgn }: GameMemorizerProps) => {
  const [position, setPosition] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    setPosition(0);
  }, [pgn]);

  const chess = new Chess();
  chess.loadPgn(pgn);
  const moves = chess.history();
  chess.reset();

  for (let i = 0; i < position; i++) {
    chess.move(moves[i]);
  }

  const totalMoves = moves.length;
  const isLastPosition = position >= totalMoves;

  function onJump(steps: number) {
    setPosition((p) => Math.min(totalMoves, Math.max(0, p + steps)));
  }

  function onGuess(san: string) {
    chess.move(moves[position]);
    const solutionFen = chess.fen();
    chess.undo();

    try {
      chess.move(san);
    } catch (e) {
      setIsWrong(true);
      return;
    }

    const guessFen = chess.fen();

    const isCorrect = solutionFen === guessFen;
    setIsWrong(!isCorrect);

    if (isCorrect) {
      onJump(1);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div>
          <div className="mx-auto mb-2 w-full max-w-[66vh]">
            <Chessboard board={chess.board()} onMove={onGuess} />
          </div>
        </div>
        <div className="flex justify-center">
          <MemorizerNav
            totalMoves={totalMoves}
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
      </div>
      <div className="flex h-24 flex-col justify-center pb-4">
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
