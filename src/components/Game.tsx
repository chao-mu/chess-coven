"use client";

// React
import React from "react";
import { useState, useEffect } from "react";

// Chess.js
import { Chess, BLACK } from "chess.js";

// Chessground
import { Key } from "chessground/types";

// Components
import { Chessboard } from "@/components/Chessboard";
import { GameOverScreen } from "@/components/GameOverScreen";
import { GameHUD } from "@/components/GameHUD";
import { GameStartScreen } from "@/components/GameStartScreen";
import { ActionBar } from "@/components/ActionBar";

// Types
import type {
  GameStatus,
  NextPuzzleLogic,
  PlayerStatus,
  GameInfo,
} from "@/types";

type GameProps = {
  gameInfo: GameInfo;
  nextPuzzle: NextPuzzleLogic;
};
const MAX_HEALTH = 3;

const ANIMATION_SPEED = 1000;

export const Game = ({ gameInfo, nextPuzzle }: GameProps) => {
  const [gameUrl, setGameUrl] = useState<string | undefined>();
  const [solutions, setSolutions] = useState<Map<string, string>>(new Map());
  const [flipped, setFlipped] = useState(false);
  const [goodGuesses, setGoodGuesses] = useState<string[]>([]);
  const [badGuesses, setBadGuesses] = useState<string[]>([]);
  const [health, setHealth] = useState(MAX_HEALTH);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("start");
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>("idle");
  const [advanced, setAdvanced] = useState(false);
  const [wins, setWins] = useState(0);

  const [fens, setFens] = useState<string[]>();
  const [fenPosition, setFenPosition] = useState(0);
  const [highlightPosition, setHighlightPosition] = useState(0);
  const [perFenFenHighlights, setPerFenHighlights] = useState<Key[][]>([]);

  const { title, rules, story, autoAdvance, solutionType } = gameInfo;

  useEffect(() => {
    if (fens && fenPosition < fens.length - 1) {
      const interval = setInterval(() => {
        if (highlightPosition < fenPosition) {
          setHighlightPosition((position) => position + 1);
        } else {
          setFenPosition((position) => position + 1);
        }
      }, ANIMATION_SPEED);
      return () => clearInterval(interval);
    }
  }, [fens, fenPosition, highlightPosition]);

  const readyToAdvance = goodGuesses.length == solutions.size;

  const resetAnimation = () => {
    setFenPosition(0);
    setHighlightPosition(0);
  };

  let highlightedSquares = perFenFenHighlights[highlightPosition] || [];
  if (solutionType == "square" && playerStatus == "gave-up") {
    highlightedSquares = Object.keys(solutions) as Key[];
  }

  const playAgain = async (newGame: boolean) => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
    }

    setHealth(MAX_HEALTH);
    setCurrentScore(0);
    setGameStatus("playing");
    setPlayerStatus("playing");

    if (newGame) {
      await gotoNextPuzzle();
    } else {
      setPlayerStatus("respawn");
    }
  };

  const gotoNextPuzzle = async () => {
    setGoodGuesses([]);
    setBadGuesses([]);

    const puzzle = await nextPuzzle({wins});
    if (puzzle.fens) {
      setFens(puzzle.fens);
    } else {
      setFens([puzzle.fen]);
    }

    setSolutions(new Map(Object.entries(puzzle.solutions)));

    setPerFenHighlights(puzzle.highlights || []);
    resetAnimation();

    if (puzzle.site) {
      setGameUrl(puzzle.site);
    }

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
      setGameStatus("over");
    }
  };

  const gainPoints = () => {
    setCurrentScore((score) => score + 1);
  };

  const checkCompleted = async () => {
    if (playerStatus === "gave-up" || readyToAdvance) {
      if (solutions.size == 0) {
        setAdvanced(true);
      }

      if (readyToAdvance) {
        setWins((w) => w + 1);
      }

      await gotoNextPuzzle();
      setPlayerStatus("playing");
      gainPoints();
    } else {
      setPlayerStatus("premature-advancement");
      loseHealth();
    }
  };

  const checkGuess = (guess: string) => {
    setPlayerStatus("playing");

    if (
      goodGuesses.includes(guess) ||
      goodGuesses.includes(solutions.get(guess) || "") ||
      badGuesses.includes(guess)
    ) {
      return false;
    }

    const isCorrect =
      solutions.has(guess) || Object.values(solutions).includes(guess);

    if (isCorrect) {
      const newGoodGuesses = [...goodGuesses, solutions.get(guess) || guess];
      setGoodGuesses(newGoodGuesses);

      // Check if puzzle is complete
      if (newGoodGuesses.length === solutions.size && autoAdvance) {
        gotoNextPuzzle().then(() => gainPoints());
      } else {
        gainPoints();
      }
    } else {
      loseHealth();
      setBadGuesses([...badGuesses, guess]);
      setPlayerStatus("wrong-guess");
    }

    return isCorrect;
  };

  const giveUp = () => {
    if (playerStatus != "premature-advancement" && playerStatus != "respawn") {
      loseHealth();
    }

    setPlayerStatus("gave-up");
    solutions.forEach((alias, solution) => {
      if (!goodGuesses.includes(solution) && !goodGuesses.includes(alias)) {
        setGoodGuesses((guesses) => [...guesses, alias]);
      }
    });
  };

  return (
    <div className="flex h-[95vh] min-w-[33vw] flex-col bg-gray-800/50">
      {gameStatus === "start" && (
        <GameStartScreen
          title={title}
          story={story}
          onGameStart={() => playAgain(true)}
          rules={rules}
        />
      )}
      {gameStatus === "over" && (
        <GameOverScreen
          title={title}
          rules={rules}
          finalScore={currentScore}
          previousHighScore={highScore}
          onContinue={() => playAgain(false)}
        />
      )}
      {gameStatus == "playing" && (
        <>
          <div>
            <div className="m-2 text-center font-header text-2xl font-bold">
              {title}
            </div>
            <div className="mt-2 p-4">{rules}</div>
            <GameHUD
              score={currentScore}
              health={health}
              highScore={highScore}
              maxHealth={MAX_HEALTH}
            />
          </div>
          <Chessboard
            movable={solutionType == "move"}
            fen={fens?.[fenPosition]}
            gameUrl={gameUrl}
            goodSquares={solutionType == "square" ? (goodGuesses as Key[]) : []}
            badSquares={solutionType == "square" ? (badGuesses as Key[]) : []}
            highlightedSquares={highlightedSquares}
            onSelect={checkGuess}
            onMove={checkGuess}
            flipped={flipped}
          >
            <div className="flex h-full flex-wrap items-center justify-between gap-2 px-2">
              <div>
                {goodGuesses && goodGuesses.length > 0 && (
                  <div className="flex gap-2 bg-gray-800/50 px-2">
                    {goodGuesses.map((guess) => (
                      <div className="text-green-500" key={guess}>
                        {guess}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                {badGuesses && badGuesses.length > 0 && (
                  <div className="flex gap-2 bg-gray-800/50 px-2 line-through">
                    {badGuesses.map((guess) => (
                      <div className="text-red-500" key={guess}>
                        {guess}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Chessboard>
          <div>
            <ActionBar
              autoAdvance={autoAdvance}
              pulseNoSolution={!advanced && solutions.size == 0}
              onAdvance={checkCompleted}
              onGiveUp={giveUp}
              allowNoSolution={gameInfo.noSolution ?? false}
              playerStatus={playerStatus}
              onSanEntry={(san) => checkGuess(san)}
              sanEntry={solutionType == "move"}
              onNumberEntry={(number) => checkGuess(String(number))}
              onReplayAnimation={() => resetAnimation()}
            />
          </div>
        </>
      )}
    </div>
  );
};
