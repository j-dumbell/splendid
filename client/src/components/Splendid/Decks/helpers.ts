import { SplendidDeck } from "../domain";

export const getDeckKeys = (decks: SplendidDeck) =>
  Object.keys(decks).reverse();

export const constructVisible = (tier: string, decks: SplendidDeck) =>
  decks[tier].filter((card) => card.id);

export const constructDeck = (tier: string, decks: SplendidDeck) =>
  decks[tier].filter((card) => !card.id);
