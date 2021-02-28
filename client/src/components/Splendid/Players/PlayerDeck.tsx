import React from "react";

import { SplendidPlayer } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import DeckCard from "../Decks/DeckCard";
import Card from "../Card";
import { PlayerDeckContainer, PurchasedCardStack } from "./styled";
import { useActivePlayer } from "../../../hooks/useActivePlayer";

const PlayerDeck = ({
  id,
  purchased,
  reservedVisible,
  reservedHidden,
}: SplendidPlayer) => {
  const [,,clientId] = useActivePlayer();

  return (
    <PlayerDeckContainer>
      <PurchasedCardStack>
        {purchased.map((card, j) => (
          <Card
            key={`player-purchased-card-${j}`}
            size="micro"
            index={j + 1}
            card={card}
          />
        ))}
      </PurchasedCardStack>
      <FlexContainer>
        {reservedVisible.map((card, k) => (
          <DeckCard
            key={`player-reserved-vis-card-${k}`}
            reserved
            size="micro"
            purchasable={id === clientId}
            card={card}
          />
        ))}
        {reservedHidden.map((card, l) => (
          <DeckCard
            key={`player-reserved-hid-card-${l}`}
            reserved
            size="micro"
            purchasable={id === clientId}
            card={card}
          />
        ))}
      </FlexContainer>
    </PlayerDeckContainer>
  );
};

export default PlayerDeck;
