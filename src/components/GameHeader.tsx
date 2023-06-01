// React
import React from "react";

type GameHeaderProps = {
  title: string;
  rules: string;
  story?: string;
};

export const GameHeader = ({ title, rules, story }: GameHeaderProps) => {
  return (
    <div className="flex flex-col px-4 pb-2 pt-5 text-white">
      <div className="pb-2 text-3xl font-bold">{title}</div>
      <div className="flex flex-col text-lg">
        {story && <div>{story}</div>}
        <div>{rules}</div>
      </div>
    </div>
  );
};
