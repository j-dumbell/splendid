import { SplendidBoard } from "../domain";

export const getDeckKeys = (decks: SplendidBoard["decks"]) =>
  Object.keys(decks).reverse();

export const constructVisible = (tier: string, decks: SplendidBoard["decks"]) =>
  decks[tier].filter((card) => card.id);

export const constructDeck = (tier: string, decks: SplendidBoard["decks"]) =>
  decks[tier].filter((card) => !card.id);
