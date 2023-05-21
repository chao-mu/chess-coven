export type Game = {
  event: string
  pgn: string
}

export type Puzzle = {
  fen: string
  solutions: string[]
  goodGuesses: string[]
  badGuesses: string[]
}
