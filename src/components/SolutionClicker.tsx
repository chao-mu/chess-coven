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
import { Puzzle, PlayerStatus, Board, EmptyBoard } from "@/types";

// Utils
import { parseFen } from "@/utils";

export type SolutionType = "move" | "square";

type SolutionClickerProps = {
  nextPuzzle: () => Puzzle;
  title: string;
  rules: string;
  story: string;
  autoAdvance: boolean;
  solutionType: SolutionType;
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
  solutionType,
}: SolutionClickerProps) => {
  const [board, setBoard] = useState<Board>(EmptyBoard);
  const [solutions, setSolutions] = useState<string[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [goodGuesses, setGoodGuesses] = useState<string[]>([]);
  const [badGuesses, setBadGuesses] = useState<string[]>([]);
  const [guessResults, setGuessResults] = useState<boolean[]>([]);
  const [health, setHealth] = useState(MAX_HEALTH);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState(GameStatus.START);
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>("idle");

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

    const puzzle = nextPuzzle();
    setBoard(parseFen(puzzle.fen));
    setSolutions(puzzle.solution);

    try {
      const chess = new Chess(puzzle.fen);
      setFlipped(chess.turn() === BLACK);
    } catch (e) {
      // We support invalid FENs
    }
  };

  const loseHealth = () => {
    const newHealth = health - 1;
    setHealth(newHealth);
    if (newHealth < 1) {
      setGameStatus(GameStatus.OVER);
    }
  };

  const checkCompleted = () => {
    if (playerStatus === "gave-up" || goodGuesses.length === solutions.length) {
      gotoNextPuzzle();
      setPlayerStatus("playing");
    } else {
      setPlayerStatus("premature-advancement");
      loseHealth();
    }
  };

  const checkGuess = (guess: string, guessType: SolutionType) => {
    if (guessType === "move") {
      //guess = strippedSan(guess);
    }

    setPlayerStatus("playing");

    if (goodGuesses.includes(guess) || badGuesses.includes(guess)) {
      return;
    }

    const isCorrect = solutions.includes(guess);
    setGuessResults([...guessResults, isCorrect]);

    if (isCorrect) {
      const newGoodGuesses = [...goodGuesses, guess];
      setGoodGuesses(newGoodGuesses);

      // Check if puzzle is complete
      if (newGoodGuesses.length === solutions.length && autoAdvance) {
        gotoNextPuzzle();
      }

      // Update score
      setCurrentScore((score) => score + 1);
    } else {
      loseHealth();
      setBadGuesses([...badGuesses, guess]);
      setPlayerStatus("wrong-guess");
    }
  };

  const giveUp = () => {
    loseHealth();
    setPlayerStatus("gave-up");
    setGoodGuesses(solutions);
  };

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
      {gameStatus == GameStatus.PLAYING && (
        <div className="flex flex-col gap-2">
          <Chessboard
            board={board}
            goodSquares={solutionType == "square" ? goodGuesses : []}
            badSquares={solutionType == "square" ? badGuesses : []}
            onSquareClick={
              solutionType == "square"
                ? (square) => checkGuess(square, "square")
                : undefined
            }
            onMove={(move) => checkGuess(move, "move")}
            flipped={flipped}
            highlightedSquares={playerStatus == "gave-up" ? solutions : []}
          />
          <ActionBar
            autoAdvance={autoAdvance}
            onAdvance={checkCompleted}
            onGiveUp={giveUp}
            playerStatus={playerStatus}
            onSanEntry={(san) => checkGuess(san, "move")}
            sanEntry={solutionType == "move"}
            goodGuesses={goodGuesses}
            badGuesses={badGuesses}
          />
        </div>
      )}
      {(gameStatus === GameStatus.PLAYING ||
        gameStatus === GameStatus.OVER) && (
        <div className="flex flex-row items-center justify-between gap-4 p-6 text-xl">
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
