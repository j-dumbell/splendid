import React from "react";

import { SplendidPlayer } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import DeckCard from "../Decks/DeckCard";
import Card from "../Card";

const PlayerDeck = ({
  purchased,
  reservedVisible,
  reservedHidden,
}: SplendidPlayer) => (
  <FlexContainer>
    {purchased.map((card, j) => (
      <Card key={`player-purchased-card-${j}`} mini {...card} />
    ))}
    <FlexContainer>
      {reservedVisible.map((card, k) => (
        <DeckCard
          key={`player-reserved-vis-card-${k}`}
          card={card}
          reserved
          mini
        />
      ))}
      {reservedHidden.map((card, l) => (
        <DeckCard
          key={`player-reserved-hid-card-${l}`}
          card={card}
          reserved
          mini
        />
      ))}
    </FlexContainer>
  </FlexContainer>
);

export default PlayerDeck;
