// NextJS
import { notFound } from "next/navigation";

// Components
import { GameStartScreen } from "@/components/GameStartScreen";

// Game
import { getFlavor } from "@/games";
import Link from "next/link";

type HasParams = {
  params: {
    gameId: string;
  };
};

export default function Page({ params: { gameId } }: HasParams) {
  const flavor = getFlavor(gameId);
  if (flavor == null) {
    return notFound();
  }
  const { rules, story, title } = flavor;

  return (
    <main className="flex gap-4 min-h-[90dvh] flex-col justify-center p-6 bg-backdrop">
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
        href={`/games/${gameId}/play`}
        className="rounded mt-2 bg-amber-600 self-center px-6 py-2 text-white hover:bg-amber-700"
      >
        Play
      </Link>
    </main>
  );
}
