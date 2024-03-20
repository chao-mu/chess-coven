"use client";

import { z } from "zod";

type StorageKey<V> = {
  key: string;
  storage: Storage;
  schema: z.Schema<V>;
  default: () => V;
};

const GameSessionSchema = z.object({
  score: z.number(),
  health: z.number(),
});

export type GameSession = z.infer<typeof GameSessionSchema>;

const LeaderboardSchema = z.object({
  highScore: z.number(),
});

export type Leaderboard = z.infer<typeof LeaderboardSchema>;

export function makeLeaderboardKey(gameId: string) {
  return {
    key: ["game", gameId, "leader-board"].join("__"),
    storage: localStorage,
    schema: LeaderboardSchema,
    default: () => ({ highScore: 0 }),
  };
}

export function makeGameSessionKey(gameId: string) {
  return {
    key: ["game-session", gameId].join("__"),
    storage: sessionStorage,
    schema: GameSessionSchema,
    default: () => ({ score: 0, health: 3 }),
  };
}

export function getHighScore(gameId: string) {
  const { highScore } = load(makeLeaderboardKey(gameId));

  return highScore;
}

export function storeHighScore(gameId: string, score: number) {
  const key = makeLeaderboardKey(gameId);
  const leaderboard = load(key);

  store(key, { ...leaderboard, highScore: score });
}

export function getHealth(gameId: string) {
  const { health } = load(makeGameSessionKey(gameId));

  return health;
}

export function getScore(gameId: string) {
  const { score } = load(makeGameSessionKey(gameId));

  return score;
}

export function updateGameSession(
  gameId: string,
  updates: Partial<GameSession>,
) {
  mutate(makeGameSessionKey(gameId), (existing) => ({
    ...existing,
    ...updates,
  }));
}

export function resetGameSession(gameId: string) {
  const key = makeGameSessionKey(gameId);
  store(key, key.default());
}

export function mutate<V>(storageKey: StorageKey<V>, f: (v: V) => V) {
  const { key, storage } = storageKey;

  const existing = load(storageKey);
  const replacement = f(existing);

  storage.setItem(key, JSON.stringify(replacement));
}

export function store<V>(storageKey: StorageKey<V>, value: V) {
  const { key, storage } = storageKey;

  storage.setItem(key, JSON.stringify(value));
}

export function load<V>(storageKey: StorageKey<V>): V {
  const { key, schema, storage } = storageKey;
  const raw = storage.getItem(key);
  if (raw === null) {
    const defaultValue = storageKey.default();
    store(storageKey, defaultValue);

    return defaultValue;
  }

  const res = schema.safeParse(JSON.parse(raw));
  if (res.success) {
    return res.data;
  }

  throw new Error(res.error.message);
}
