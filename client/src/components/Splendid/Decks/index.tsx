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
    {getDeckKeys(decks).map((tier, i) => (
      <FlexContainer key={`deck-${i}`}>
        <DeckStack>
          <StackCount>{constructDeck(tier, decks).length}</StackCount>
          <DeckCard tier={Number(tier)} />
        </DeckStack>
        {constructVisible(tier, decks).map((card, j) => (
          <DeckCard key={`cards-${j}`} {...card} />
        ))}
      </FlexContainer>
    ))}
  </>
);

export default Decks;
