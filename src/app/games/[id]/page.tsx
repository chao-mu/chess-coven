// NextJS
import { notFound } from "next/navigation";

// Components
import { GameStartScreen } from "@/components/GameStartScreen";

// Game
import { getFlavor } from "@/games";

type HasParams = {
  params: {
    id: string;
  };
};

export default function Page({ params: { id } }: HasParams) {
  const flavor = getFlavor(id);
  if (flavor == null) {
    return notFound();
  }
  const { rules, story, title } = flavor;

  return (
    <GameStartScreen
      rules={rules}
      story={story}
      title={title}
      to={`/puzzles/${id}/1`}
    />
  );
}
