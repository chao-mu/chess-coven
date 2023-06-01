// React
import React from "react";

type GameStartScreenProps = {
  rules: string;
  story: string;
  title: string;
  onGameStart: () => void;
};

export const GameStartScreen = ({
  rules,
  story,
  onGameStart,
  title,
}: GameStartScreenProps) => {
  return (
    <div className="flex flex-col p-6">
      <h1 className="mb-4 text-center text-4xl">{title}</h1>
      <div className="mb-1 text-center text-xl font-bold">Story</div>
      <p className="mb-4 text-justify indent-6 text-lg">{story}</p>
      <div className="mb-1 text-center text-xl font-bold">Rules</div>
      <p className="mb-4 text-justify indent-6 text-lg">{rules}</p>
      <div className="flex justify-center">
        <button
          className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
          onClick={onGameStart}
        >
          Play
        </button>
      </div>
    </div>
  );
};
