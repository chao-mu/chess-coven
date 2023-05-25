// React
import React from 'react';
import { useState } from 'react';

// Chess.js
import { Chess, BLACK } from 'chess.js';

// Components
import { Chessboard } from '@/components/Chessboard';
import { Heart } from '@/components/Heart';
import { GameOverScreen } from '@/components/GameOverScreen';
import { GameStartScreen } from '@/components/GameStartScreen';

// Types
import { Puzzle } from '@/types';

type SolutionClickerProps = {
  nextPuzzle: () => Puzzle
  title: string
  rules: string
  story: string
};

const GameStatus = {
  START: 'start',
  PLAYING: 'playing',
  OVER: 'over',
};

const MAX_HEALTH = 3;

export const SolutionClicker = ({ nextPuzzle, title, rules, story }: SolutionClickerProps) => {
  const [puzzle, setPuzzle] = useState<Puzzle | undefined>();
  const [goodGuesses, setGoodGuesses] = useState<string[]>([]);
  const [badGuesses, setBadGuesses] = useState<string[]>([]);
  const [guessResults, setGuessResults] = useState<boolean[]>([]);
  const [health, setHealth] = useState(MAX_HEALTH);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState(GameStatus.START);

  let currentFen;
  if (puzzle) {
    currentFen = puzzle.fen;
  }

  const playAgain = () => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
    }

    setGuessResults([]);
    setHealth(MAX_HEALTH);
    setCurrentScore(0);
    setGameStatus(GameStatus.PLAYING);

    gotoNextPuzzle();
  }

  const gotoNextPuzzle = () => {
    setGoodGuesses([]);
    setBadGuesses([]);
    setPuzzle(nextPuzzle());
  }

  const checkGuess = (square: string) => {
    if (goodGuesses.includes(square) || badGuesses.includes(square)) {
      return;
    }

    const solutions = puzzle?.solution || []
    const isCorrect = solutions.includes(square);
    setGuessResults([...guessResults, isCorrect]);

    if (isCorrect) {
      const newGoodGuesses = [...goodGuesses, square];
      setGoodGuesses(newGoodGuesses);

      // Check if puzzle is complete
      if (newGoodGuesses.length === solutions.length) {
        gotoNextPuzzle();
      }

      // Update score
      setCurrentScore(score => score + 1);
    } else {
      const newHealth = health - 1;
      setHealth(newHealth);
      if (newHealth < 1) {
        setGameStatus(GameStatus.OVER);
      } 

      setBadGuesses([...badGuesses, square]);
    }
  }

  let flipped = false
  if (!currentFen) {
    const chess = new Chess(currentFen)
    flipped = chess.turn() == BLACK
  }

  return (
    <div className="flex h-full flex-col">
      { (gameStatus === GameStatus.PLAYING || gameStatus === GameStatus.OVER) &&
      <div className="p-6">
        <div className="text-3xl font-bold">{ title }</div>         
        <div className="mt-2 text-xl">{ rules }</div>
      </div>
      }
      { gameStatus === GameStatus.START &&
        <GameStartScreen
          title={title}
          story={story}
          rules={rules}
          onGameStart={() => playAgain()}
        />
      }
      { gameStatus === GameStatus.OVER &&
        <GameOverScreen
          finalScore={currentScore}
          newHighScore={currentScore > highScore}
          onPlayAgain={playAgain}
        />
      }
      { gameStatus == GameStatus.PLAYING && 
        <Chessboard
          fen={currentFen}
          goodSquares={goodGuesses}
          badSquares={badGuesses}
          onSquareClick={checkGuess}
          flipped={flipped}
        />
      }
      { (gameStatus === GameStatus.PLAYING || gameStatus === GameStatus.OVER) &&
        <div className="flex flex-row items-center justify-between gap-4 px-4 py-2 text-xl">
          <div>Score: { currentScore }</div>
          <div>High Score: { highScore }</div>
          <div className="flex gap-2">
            { [...Array(MAX_HEALTH)].map((_, index) => (
              <Heart key={index} full={index < health} />
            )) }
          </div>
        </div>
      }
    </div>
  );
}

