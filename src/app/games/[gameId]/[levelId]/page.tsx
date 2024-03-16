// NextJS
import { notFound } from "next/navigation";

// Components
import { Game } from "@/components/Game";
import { getLevel, getFlavor, getLogic } from "@/games";

type HasParams = {
  params: {
    gameId: string;
    levelId: string;
  };
};

async function getLevelWithAll(gameId: string, levelId: string) {
  if (levelId == "all") {
    return getLevel(gameId);
  }

  return getLevel(gameId, Number(levelId));
}

export default async function Page({ params: { gameId, levelId } }: HasParams) {
  const flavor = getFlavor(gameId);
  if (flavor == null) {
    return notFound();
  }

  const logic = getLogic(gameId);
  if (flavor == null) {
    return notFound();
  }

  const level = await getLevelWithAll(gameId, levelId);
  if (!level.success) {
    throw new Error(level.error);
  }

  return <Game id={gameId} flavor={flavor} logic={logic} level={level.data} />;
}
