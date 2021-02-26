import React from "react";

import { SplendidDeck } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import { getDeckKeys, constructVisible, constructDeck } from "./helpers";
import DeckCard from "./DeckCard";
import { DeckStack, StackCount } from "./styled";

type Props = {
  decks: SplendidDeck;
};

const Decks = ({ decks }: Props) => (
  <>
    {getDeckKeys(decks).map((tier, i) => {
      const deckCount = constructDeck(tier, decks).length;
      return (
        <FlexContainer key={`deck-${i}`} justify="center">
          <DeckStack shadowed={deckCount > 1}>
            <StackCount>{deckCount}</StackCount>
            <DeckCard tier={Number(tier)} shadowed={deckCount > 1} />
          </DeckStack>
          {constructVisible(tier, decks).map((card, j) => (
            <DeckCard key={`cards-${j}`} {...card} />
          ))}
        </FlexContainer>
      );
    })}
  </>
);

export default Decks;
