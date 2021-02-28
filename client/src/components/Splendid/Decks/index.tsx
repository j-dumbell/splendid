import React from "react";

import { SplendidDeck } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import { getDeckKeys, constructVisible, constructDeck } from "./helpers";
import DeckCard from "./DeckCard";
import { DeckStack } from "./styled";
import { useActivePlayer } from "../../../hooks/useActivePlayer";

type Props = {
  decks: SplendidDeck;
};

const Decks = ({ decks }: Props) => {
  const [isActivePlayer] = useActivePlayer();
  return (
    <>
      {getDeckKeys(decks).map((tier, i) => {
        const deckCount = constructDeck(tier, decks).length;
        return (
          <FlexContainer key={`deck-${i}`} justify="center">
            <DeckStack shadowed={deckCount > 1}>
              <DeckCard
                card={{ tier: Number(tier) }}
                shadowed={deckCount > 1}
                purchasable={isActivePlayer}
              />
            </DeckStack>
            {constructVisible(tier, decks).map((card, j) => (
              <DeckCard
                key={`cards-${j}`}
                card={card}
                purchasable={isActivePlayer}
              />
            ))}
          </FlexContainer>
        );
      })}
    </>
  );
};

export default Decks;
