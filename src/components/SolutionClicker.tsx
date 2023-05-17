// React
import React from 'react';
import { useState } from 'react';

// Components
import { Chessboard } from './Chessboard';

// Types
import { Puzzle } from '@/types';

type SolutionClickerProps = {
  puzzles: Puzzle[]
};

export const SolutionClicker = ({ puzzles }: SolutionClickerProps) => {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [goodGuesses, setGoodGuesses] = useState<string[]>([]);
  const [badGuesses, setBadGuesses] = useState<string[]>([]);
  const [guessResults, setGuessResults] = useState<boolean[]>([]);

  let currentFen = "";
  if (puzzles.length > 0) {
    currentFen = puzzles[puzzleIndex].fen;
  }

  let lastFen = "";
  if (puzzleIndex > 0) {
    lastFen = puzzles[puzzleIndex - 1].fen;
  }

  const recentResults = guessResults.slice(-5);
  const momentum = recentResults.reduce((acc, curr) => acc + (curr ? 1 : -1), 0) / (recentResults.length || 1);

  const checkGuess = (square: string) => {
    if (goodGuesses.includes(square) || badGuesses.includes(square)) {
      return;
    }

    const solutions = puzzles[puzzleIndex].solution;
    const isCorrect = solutions.includes(square);
    setGuessResults([...guessResults, isCorrect]);

    if (isCorrect) {
      const newGoodGuesses = [...goodGuesses, square];
      setGoodGuesses(newGoodGuesses);

      // Check if puzzle is complete
      if (newGoodGuesses.length === solutions.length) {
        setPuzzleIndex((index) => index + 1)
        setGoodGuesses([]);
        setBadGuesses([]);
      }
    } else {
      setBadGuesses([...badGuesses, square]);
    }
  }

  return (
    <div className="flex flex-col">
      <Chessboard
        fen={currentFen}
        goodSquares={goodGuesses}
        badSquares={badGuesses}
        onSquareClick={checkGuess} />
      <div className="bg-purple-300 px-4 py-2 text-black flex flex-col">
        <div className="text-center font-bold">
          Momentum: { momentum >= 0 ? "+" : "" }{ momentum.toFixed(2) }
        </div>
        <div className="text-md pt-2">FEN: { currentFen }</div>
        <div className="text-md pt-2">Last FEN: { lastFen }</div>
      </div>
    </div>
  );
}

