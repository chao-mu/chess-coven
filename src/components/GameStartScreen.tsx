"use server";

import Link from "next/link";

type GameStartScreenProps = {
  rules: string;
  story: string;
  title: string;
  to: string;
};

export const GameStartScreen = ({
  rules,
  story,
  to,
  title,
}: GameStartScreenProps) => {
  return (
    <div className="flex h-full gap-4 grow flex-col justify-center p-6">
      <h1 className="text-center text-4xl">{title}</h1>
      <div>
        <div className="mb-1 text-center text-xl font-bold">Story</div>
        <p className="text-justify indent-6 text-lg">{story}</p>
      </div>
      <div>
        <div className="mb-1 text-center text-xl font-bold">Rules</div>
        <p className="text-justify indent-6 text-lg">{rules}</p>
      </div>
      <Link
        href={to}
        className="rounded mt-2 bg-amber-600 self-center px-6 py-2 text-white hover:bg-amber-700"
      >
        Play
      </Link>
    </div>
  );
};
