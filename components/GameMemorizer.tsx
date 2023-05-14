// React
import React from 'react';
import { useState, useEffect } from 'react';

// chess.js
import { Chess } from 'chess.js';

// Components
import { MemorizerNav } from './MemorizerNav';
import { Chessboard } from './Chessboard';
import { SanInputForm } from './SanInputForm';

type GameMemorizerProps = {
  pgn: string
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

  const totalMoves = moves.length
  const isLastPosition = position >= totalMoves;

  function onJump(steps: number) {
    setPosition((p) => Math.min(totalMoves, Math.max(0, p + steps)))
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
    <div className="flex flex-col w-full">  
      <div className="flex flex-col w-full items-center">  
        <div className="w-full mb-2">
          <Chessboard fen={chess.fen()}/>
        </div>
        <MemorizerNav
          totalMoves={totalMoves}
          position={position}
          onJump={onJump}
          isRevealed={isRevealed}
          onRevealToggle={(revealed: boolean) => {
            if (revealed) {
              setIsWrong(false)
            }
            setIsRevealed(revealed)
          }}
        />
      </div>
      <div className="mt-4 flex justify-center items-center">
        {isLastPosition ? (
          <div className="text-center text-2xl font-bold">
            🎉 End of game!
          </div>
        ) : isRevealed ? (
          <div>
            <div className="flex text-2xl">
              <div className="mr-3">
                Continuation
              </div>
              <div>
                {moves[position]}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="text-2xl mr-3 flex justify-center items-center">
              Continuation
            </div>
            <SanInputForm
              onSubmit={onGuess}
              isWrong={isWrong}
            />
          </div>
        )}
      </div>
    </div>
  );
}

