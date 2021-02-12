import React from "react";

import { SplendidBoard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import { getDeckKeys, constructVisible, constructDeck } from "./helpers";
import DeckCard from "./DeckCard";
import { DeckStack, StackCount } from "./styled";

type Props = {
  decks: SplendidBoard["decks"];
};

const Decks = ({ decks }: Props) => (
  <>
    {getDeckKeys(decks).map((tier, i) => (
      <FlexContainer key={`deck-${i}`}>
        {constructVisible(tier, decks).map((card, j) => (
          <DeckCard key={`cards-${j}`} {...card} />
        ))}
        <DeckStack>
          <StackCount>{constructDeck(tier, decks).length}</StackCount>
          <DeckCard tier={Number(tier)} />
        </DeckStack>
      </FlexContainer>
    ))}
  </>
);

export default Decks;
