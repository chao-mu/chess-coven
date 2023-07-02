// Types
import { PuzzleCollection } from "@/types";

// Assets
import undefendedPieces from "@/assets/puzzles/undefended.json";

export default {
  title: "Enchant the Undefended",
  rules:
    "Click undefended pieces. A piece is considered undefended if there are no allies who have sight on its square.",
  story:
    "The battlefield is littered with fallen chesspersons. Opposing forces clash, blinded by mutual hatred and pricked on by a thirst for blood. There is however a chance for peace. Find the chesspersons who are most vulnerable and pacify them to quell the cycle of violence.",
  solutionType: "square",
  puzzles: undefendedPieces,
  autoAdvance: false,
} as PuzzleCollection;
