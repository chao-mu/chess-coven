// React
import React from "react";
import { useState } from "react";

// Chess.js
import { Chess, BLACK } from "chess.js";

// Components
import { Chessboard } from "@/components/Chessboard";
import { Heart } from "@/components/Heart";
import { GameOverScreen } from "@/components/GameOverScreen";
import { GameStartScreen } from "@/components/GameStartScreen";
import { ActionBar } from "@/components/ActionBar";

// Types
import { Puzzle, PlayerStatus } from "@/types";

// Utils
import { parseFen } from "@/utils";

type SolutionClickerProps = {
  nextPuzzle: () => Puzzle;
  title: string;
  rules: string;
  story: string;
  autoAdvance: boolean;
};

const GameStatus = {
  START: "start",
  PLAYING: "playing",
  OVER: "over",
};

const MAX_HEALTH = 3;

export const SolutionClicker = ({
  nextPuzzle,
  title,
  rules,
  story,
  autoAdvance,
}: SolutionClickerProps) => {
  const [puzzle, setPuzzle] = useState<Puzzle | undefined>();
  const [goodGuesses, setGoodGuesses] = useState<string[]>([]);
  const [badGuesses, setBadGuesses] = useState<string[]>([]);
  const [guessResults, setGuessResults] = useState<boolean[]>([]);
  const [health, setHealth] = useState(MAX_HEALTH);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState(GameStatus.START);
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>("idle");

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
    setPlayerStatus("playing");

    gotoNextPuzzle();
  };

  const gotoNextPuzzle = () => {
    setGoodGuesses([]);
    setBadGuesses([]);
    setPuzzle(nextPuzzle());
  };

  const loseHealth = () => {
    const newHealth = health - 1;
    setHealth(newHealth);
    if (newHealth < 1) {
      setGameStatus(GameStatus.OVER);
    }
  };

  const checkCompleted = () => {
    const solutions = puzzle?.solution || [];

    if (playerStatus === "gave-up" || goodGuesses.length === solutions.length) {
      gotoNextPuzzle();
      setPlayerStatus("playing");
    } else {
      setPlayerStatus("premature-advancement");
      loseHealth();
    }
  };

  const checkGuess = (square: string) => {
    setPlayerStatus("playing");

    if (goodGuesses.includes(square) || badGuesses.includes(square)) {
      return;
    }

    const solutions = puzzle?.solution || [];
    const isCorrect = solutions.includes(square);
    setGuessResults([...guessResults, isCorrect]);

    if (isCorrect) {
      const newGoodGuesses = [...goodGuesses, square];
      setGoodGuesses(newGoodGuesses);

      // Check if puzzle is complete
      if (newGoodGuesses.length === solutions.length && autoAdvance) {
        gotoNextPuzzle();
      }

      // Update score
      setCurrentScore((score) => score + 1);
    } else {
      loseHealth();
      setBadGuesses([...badGuesses, square]);
    }
  };

  const giveUp = () => {
    loseHealth();
    setPlayerStatus("gave-up");
  };

  let flipped = false;
  if (!currentFen) {
    const chess = new Chess(currentFen);
    flipped = chess.turn() == BLACK;
  }

  return (
    <div className="flex h-full flex-col">
      {(gameStatus === GameStatus.PLAYING ||
        gameStatus === GameStatus.OVER) && (
        <div className="p-6">
          <div className="text-3xl font-bold">{title}</div>
          <div className="mt-2 text-xl">{rules}</div>
        </div>
      )}
      {gameStatus === GameStatus.START && (
        <GameStartScreen
          title={title}
          story={story}
          rules={rules}
          onGameStart={() => playAgain()}
        />
      )}
      {gameStatus === GameStatus.OVER && (
        <GameOverScreen
          finalScore={currentScore}
          newHighScore={currentScore > highScore}
          onPlayAgain={playAgain}
        />
      )}
      {gameStatus == GameStatus.PLAYING && currentFen && (
        <div className="flex flex-col gap-2">
          <Chessboard
            board={parseFen(currentFen)}
            goodSquares={goodGuesses}
            badSquares={badGuesses}
            onSquareClick={checkGuess}
            flipped={flipped}
            highlightedSquares={
              playerStatus == "gave-up" ? puzzle?.solution : []
            }
          />
          <ActionBar
            autoAdvance={autoAdvance}
            onAdvance={checkCompleted}
            onGiveUp={giveUp}
            playerStatus={playerStatus}
          />
        </div>
      )}
      {(gameStatus === GameStatus.PLAYING ||
        gameStatus === GameStatus.OVER) && (
        <div className="flex flex-row items-center justify-between gap-4 px-4 py-2 text-xl">
          <div>Score: {currentScore}</div>
          <div>High Score: {highScore}</div>
          <div className="flex gap-2">
            {[...Array(MAX_HEALTH)].map((_, index) => (
              <Heart key={index} full={index < health} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
