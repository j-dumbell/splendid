import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import { SplendidCard, SplendidPlayer } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import DeckCard from "../Decks/DeckCard";
import Card from "../Card";

const PlayerCard = ({
  selected,
  ...card
}: SplendidCard & { selected: string }) => {
  const { isActivePlayer } = useSelector(({ isActivePlayer }: State) => ({
    isActivePlayer,
  }));

  return isActivePlayer ? (
    <DeckCard reserved mini card={card} selected={selected} />
  ) : (
    <Card reserved mini {...card} />
  );
};

const PlayerDeck = ({
  selected,
  ...player
}: SplendidPlayer & { selected: string }) => (
  <FlexContainer>
    {player.purchased.map((card, j) => (
      <Card key={`player-purchased-card-${j}`} mini {...card} />
    ))}
    <FlexContainer>
      {player.reservedVisible.map((card, k) => (
        <PlayerCard
          key={`player-reserved-vis-card-${k}`}
          selected={selected}
          {...card}
        />
      ))}
      {player.reservedHidden.map((card, l) => (
        <PlayerCard
          key={`player-reserved-hid-card-${l}`}
          selected={selected}
          {...card}
        />
      ))}
    </FlexContainer>
  </FlexContainer>
);

export default PlayerDeck;
