// React
import React from 'react';
import { useState } from 'react';

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

  return (
    <div className="flex flex-col">
      <div className="p-6">
        <div className="text-3xl font-bold">{ title }</div>         
        <div className="text-xl mt-2">{ rules }</div>
      </div>
      { isGameOver ? (
        <div className="flex items-center justify-center aspect-square">
          <div className="flex flex-col items-start">
            <div className="text-3xl font-bold mb-4">Game Over!</div>
            <div className="text-2xl mb-2">Final Score: { currentScore }</div>
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => playAgain()}>Play Again</button>
          </div>
        </div>
      ) : (
        <Chessboard
          fen={currentFen}
          goodSquares={goodGuesses}
          badSquares={badGuesses}
          onSquareClick={checkGuess} />
      ) }
      <div className="flex flex-row justify-between px-4 py-2">
        <div className="text-md">Score: { currentScore }</div>
        <div className="text-md">High Score: { highScore }</div>
        <div className="text-md">Health: { health }</div>
      </div>
      <div className="text-md flex flex-col gap-4 py-4 px-4">
        <div>{ story }</div>
      </div>
    </div>
  );
}

