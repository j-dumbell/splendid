export const splendidResource = [
  "black",
  "white",
  "red",
  "blue",
  "green",
  "yellow",
] as const;
export type SplendidResource = typeof splendidResource[number];

export type SplendidResourceList = Record<SplendidResource, number>;

export type SplendidCard = {
  id?: number;
  tier: number;
  points?: number;
  income?: SplendidResource;
  cost?: SplendidResourceList;
};

export type SplendidElite = {
  id: number;
  points: number;
  cost: SplendidResourceList;
};

export type SplendidBoard = {
  decks: Record<string, SplendidCard[]>;
  elites: SplendidElite[];
  bank: SplendidResourceList;
};

export type SplendidPlayer = {
  name?: string;
  id: number;
  bank: SplendidResourceList;
  purchased: SplendidCard[];
  reservedVisible: SplendidCard[];
  reservedHidden: SplendidCard[];
};

export type SplendidGame = {
  activePlayerIndex: number;
  turn: number;
  board: SplendidBoard;
  players: SplendidPlayer[];
};
