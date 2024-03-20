// NextJS
import { notFound } from "next/navigation";

// Components
import { GameStartScreen } from "@/components/GameStartScreen";

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
  const { rules, story, title } = flavor;

  return (
    <GameStartScreen
      rules={rules}
      story={story}
      title={title}
      to={`/games/${gameId}/playing`}
    />
  );
}
