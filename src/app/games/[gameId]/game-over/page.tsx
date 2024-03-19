// NextJS
import { notFound } from "next/navigation";

// Components
import { GameOverScreen } from "@/components/GameOverScreen";

// Game
import { getFlavor } from "@/games";

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
  const { rules, title } = flavor;

  return (
    <GameOverScreen
      previousHighScore={0}
      finalScore={0}
      rules={rules}
      title={title}
      to={`/games/${gameId}/1`}
    />
  );
}
