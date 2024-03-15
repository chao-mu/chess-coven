import type { GameFlavor } from "@/types";

const flavors: Record<string, GameFlavor> = {
  "knight-forks": {
    title: "Catapult Knights",
    rules:
      "Click a square that if you were to drop a knight on it, all pieces would be attacked. Otherwise click No Solution.",
    story:
      "The king and queen of the enemy army think they're safe chilling at the local outdoor pub. Catapult a knight across the kingdom (it's a Tactical Elements brand catapult) and cause mayhem!",
  },
  "checks-captures": {
    title: "Checks/Captures",
    rules:
      "By clicking squares, perform all legal captures and checks for either side.",
    story:
      "Tomorrow the war reaches your small village. Analyze the crawling battlefield to determine where destruction is inevitable.",
  },
  counting: {
    title: "Count Capture Points",
    rules:
      "Watch the animation and determine the final change in material difference after all captures, using relative piece values. Captures of Pawns are worth 1 point, Knights and Bishops are worth 3 points, Rooks are worth 5 points, and Queens are worth 9 points. For example, if a pawn captures a knight and then the pawn is captured, the answer would be 2. If a queen captures a pawn and a pawn takes back, the total is -8",
    story:
      "The death toll from the war increases every day. The war has gone on far too long and soon will be the mutual ruin of both kingdoms. You must prepare a PowerPoint slide presentation to convince the ruling monarchs that peace is the best option.",
  },
  undefended: {
    title: "Enchant the Undefended",
    rules:
      "Click undefended pieces. A piece is considered undefended if there are no allies who have sight on its square.",
    story:
      "The battlefield is littered with fallen chesspersons. Opposing forces clash, blinded by mutual hatred and pricked on by a thirst for blood. There is however a chance for peace. Find the chesspersons who are most vulnerable and pacify them to quell the cycle of violence.",
  },
};

export function getFlavor(id: string): GameFlavor | null {
  return flavors[id] ?? null;
}
