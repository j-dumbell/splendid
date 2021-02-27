import React from "react";

import { SplendidPlayer } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import DeckCard from "../Decks/DeckCard";
import Card from "../Card";
import { PlayerDeckContainer } from "./styled";

const PlayerDeck = ({
  purchased,
  reservedVisible,
  reservedHidden,
}: SplendidPlayer) => (
  <PlayerDeckContainer>
    {purchased.map((card, j) => (
      <Card key={`player-purchased-card-${j}`} size="mini" {...card} />
    ))}
    <FlexContainer>
      {reservedVisible.map((card, k) => (
        <DeckCard
          key={`player-reserved-vis-card-${k}`}
          reserved
          size="mini"
          {...card}
        />
      ))}
      {reservedHidden.map((card, l) => (
        <DeckCard
          key={`player-reserved-hid-card-${l}`}
          reserved
          size="mini"
          {...card}
        />
      ))}
    </FlexContainer>
  </PlayerDeckContainer>
);

export default PlayerDeck;
