import { WHITE, BLACK, Color, PieceSymbol, Square } from "chess.js";

import { Board, Rank } from "@/types";

export function parseFen(fen: string): Board {
  const rowsEncoded = fen.split(" ")[0];
  const rows = rowsEncoded.split("/");
  return rows.map((row, rowIdx) => {
    const cells = row.split("");
    const stagedRank: ({ color: Color; type: PieceSymbol } | null)[] = [];
    cells.forEach((cell) => {
      if (isNaN(Number(cell))) {
        stagedRank.push({
          color: cell === cell.toUpperCase() ? WHITE : (BLACK as Color),
          type: cell.toLowerCase() as PieceSymbol,
        });
      } else {
        for (let i = 0; i < Number(cell); i++) {
          stagedRank.push(null);
        }
      }
    });

    const rank: Rank = [];
    stagedRank.forEach((piece, i) => {
      if (piece == null) {
        rank.push(null);
      } else {
        rank.push({
          ...piece,
          square: toSquareName(rowIdx, i, false) as Square,
        });
      }
    });

    return rank;
  });
}

export function toSquareName(
  rowIdx: number,
  colIdx: number,
  flipped: boolean
): string {
  if (flipped) {
    rowIdx = 7 - rowIdx;
  }

  const squareLetter = ["a", "b", "c", "d", "e", "f", "g", "h"][colIdx];
  const squareNumber = (8 - rowIdx).toString();

  return `${squareLetter}${squareNumber}`;
}
