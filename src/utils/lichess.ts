export type LichessGame = {
  id: string;
  rated: boolean;
  variant: string;
  speed: string;
  perf: string;
  createdAt: number;
  lastMoveAt: number;
  status: string;
  players: {
    white: {
      user: {
        name: string;
        rating: number;
      };
    };
    black: {
      user: {
        name: string;
        rating: number;
      };
    };
  };
  initialFen: string;
  winner: string;
  opening: {
    eco: string;
    name: string;
    ply: number;
  };
  moves: string;
  pgn: string;
  daysPerTurn: number;
  tournament: string;
  swiss: string;
  clock: {
    initial: number;
    increment: number;
    totalTime: number;
  };
  clocks: number[];
};

export const getLichessUserGames = async (
  username: string,
): Promise<LichessGame[]> => {
  const response = await fetch(
    `https://lichess.org/api/games/user/${username}?max=100&clocks=true&evals=false&moves=true`,
    {
      headers: {
        Accept: "application/x-ndjson",
      },
    },
  );
  const data = await response.text();

  const games = data.split("\n").flatMap((game) => {
    if (!game || game.replace(/\s/g, "") === "") {
      return [];
    }

    return JSON.parse(game) as LichessGame;
  });

  return games;
};
