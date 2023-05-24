// React
import React from 'react';
import { useState } from 'react';

// Chess.js
import { Chess, BLACK } from 'chess.js';

// Components
import { Chessboard } from './Chessboard';

// Types
import { Puzzle } from '@/types';

type SolutionClickerProps = {
  puzzles: Puzzle[]
  title: string
  rules: string
  story: string
};

const MAX_HEALTH = 3;

export const SolutionClicker = ({ puzzles, title, rules, story }: SolutionClickerProps) => {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [goodGuesses, setGoodGuesses] = useState<string[]>([]);
  const [badGuesses, setBadGuesses] = useState<string[]>([]);
  const [guessResults, setGuessResults] = useState<boolean[]>([]);
  const [health, setHealth] = useState(MAX_HEALTH);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  let currentFen = "";
  if (puzzles.length > 0) {
    currentFen = puzzles[puzzleIndex].fen;
  }

  const playAgain = () => {
    setGoodGuesses([]);
    setBadGuesses([]);
    setGuessResults([]);
    setHealth(MAX_HEALTH);
    setIsGameOver(false);
    setCurrentScore(0);
  }

  // const recentResults = guessResults.slice(-5);
  // const momentum = recentResults.reduce((acc, curr) => acc + (curr ? 1 : -1), 0) / (recentResults.length || 1);

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

      // Update score
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
      }
    } else {
      const newHealth = health - 1;
      if (newHealth === 0) {
        setIsGameOver(true);
      } else {
        setHealth(newHealth);
      }

      setBadGuesses([...badGuesses, square]);
    }
  }

  // Determine if chessboard should be flipped based on who's turn it is
  let flipped = false;
  if (currentFen) {
    const chess = new Chess(currentFen)
    flipped = chess.turn() == BLACK
  }

  return (
    <div className="flex flex-col">
      <div className="p-6">
        <div className="text-3xl font-bold">{ title }</div>         
        <div className="mt-2 text-xl">{ rules }</div>
      </div>
      { isGameOver ? (
        <div className="flex aspect-square items-center justify-center">
          <div className="flex flex-col items-start">
            <div className="mb-4 text-3xl font-bold">Game Over!</div>
            <div className="mb-2 text-2xl">Final Score: { currentScore }</div>
            <button className="rounded-full bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700"
              onClick={() => playAgain()}>Play Again</button>
          </div>
        </div>
      ) : (
        <Chessboard
          fen={currentFen}
          goodSquares={goodGuesses}
          badSquares={badGuesses}
          onSquareClick={checkGuess}
          flipped={flipped}
        />
      ) }
      <div className="flex flex-row justify-between px-4 py-2">
        <div>Score: { currentScore }</div>
        <div>High Score: { highScore }</div>
        <div>Health: { health }</div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div>{ story }</div>
      </div>
    </div>
  );
}

