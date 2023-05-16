// React
import React from 'react';
import { useState, useEffect } from 'react';

// chess.js
import { Chess } from 'chess.js';

// Components
import { Chessboard } from './Chessboard';

// Types
import { Puzzle } from '../types';

type SolutionClickerProps = {
  puzzles: Puzzle[]
  title: string
  rules: string
};

export const SolutionClicker = ({ title, rules, puzzles }: SolutionClickerProps) => {
  const [score, setScore] = useState(0);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [goodGuesses, setGoodGuesses] = useState<string[]>([]);
  const [badGuesses, setBadGuesses] = useState<string[]>([]);

  const currentFen = puzzles[puzzleIndex].fen;
  let lastFen = ''
  if (puzzleIndex > 0) {
    lastFen = puzzles[puzzleIndex - 1].fen;
  }

  const checkGuess = (square: string) => {
    if (goodGuesses.includes(square) || badGuesses.includes(square)) {
      return;
    }

    const solutions = puzzles[puzzleIndex].solution;
    const isCorrect = solutions.includes(square);
    if (isCorrect) {
      const newGoodGuesses = [...goodGuesses, square];
      setGoodGuesses(newGoodGuesses);

      // Update scoreboard
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(score + 1);
      }

      // Check if puzzle is complete
      if (newGoodGuesses.length === solutions.length) {
        // Go to next puzzle
        setPuzzleIndex((index) => (index + 1) % puzzles.length);
        setGoodGuesses([]);
        setBadGuesses([]);
      }
    } else {
      setScore(0);
      setBadGuesses([...badGuesses, square]);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="px-4 py-2 bg-purple-500 flex flex-col text-white">
        <div className="text-3xl font-bold">{ title }</div>         
        <div className="text-lg flex justify-between flex-wrap">
          <div className="whitespace-nowrap mr-1">{ rules }</div>
          <div className="whitespace-nowrap">White on bottom</div>
        </div>
      </div>                                       
      <Chessboard
        fen={currentFen}
        goodSquares={goodGuesses}
        badSquares={badGuesses}
        onSquareClick={checkGuess} />
      <div className="bg-purple-300 px-4 py-2 text-black">
        <div className="flex justify-between items-center font-bold text-lg">
          <div>Score: { score }</div>
          <div>Still more to go</div>
          <div>High Score: { highScore }</div>
        </div>
        <div className="text-md pt-2">FEN: { currentFen }</div>
        <div className="text-md pt-2">Last FEN: { lastFen }</div>
      </div>
    </div>
  );
}

