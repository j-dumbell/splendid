export const splendidResource = [
  "black",
  "blue",
  "green",
  "red",
  "white",
  "yellow",
] as const;
export type SplendidResource = typeof splendidResource[number];

export type SplendidResourceList = Record<SplendidResource, number>;

const sizes = ["default", "mini", "micro"] as const;
export type ResourceSize = typeof sizes[number];
export type CardSize = typeof sizes[number];

export type SplendidCard = {
  id?: number;
  tier: number;
  points?: number;
  income?: SplendidResource;
  cost?: SplendidResourceList;
};

export type SplendidDeck = Record<string, SplendidCard[]>;

export type SplendidElite = {
  id: number;
  points: number;
  cost: SplendidResourceList;
};

export type SplendidBoard = {
  decks: SplendidDeck;
  elites: SplendidElite[];
  bank: SplendidResourceList;
  bankOffsetTemp?: SplendidResourceList;
};

export type SplendidPlayer = {
  id: number;
  bank: SplendidResourceList;
  purchased: SplendidCard[];
  reservedVisible: SplendidCard[];
  reservedHidden: SplendidCard[];
  elites: SplendidElite[];
};

export type SplendidGame = {
  activePlayerIndex: number;
  turn: number;
  board: SplendidBoard;
  players: SplendidPlayer[];
};

export type SplendidForm = {
  cardId: string;
  gameAction: string;
  selectedCard: string;
  resources: SplendidResourceList;
};
