import React from "react";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";

import { SplendidPlayer, splendidResource } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Card from "../Card";
import ResourceList from "../ResourceList";
import { State } from "../../../state/domain";
import { PlayersContainer, PlayerContainer } from "./styled";
import DeckCard from "../Decks/DeckCard";

type Props = {
  players: SplendidPlayer[];
  activePlayerIndex: number;
};

const Players = ({ players, activePlayerIndex }: Props) => {
  const { values } = useFormikContext<any>();
  const { clientId, playerNames, isActivePlayer } = useSelector(
    ({ clientId, playerNames, isActivePlayer }: State) => ({
      clientId,
      playerNames,
      isActivePlayer,
    })
  );

  return (
    <PlayersContainer>
      {players.map((player, i) => (
        <PlayerContainer
          column
          key={`player-${i}`}
          isActive={i === activePlayerIndex}
        >
          <h2 style={{ color: clientId === player.id ? "white" : "inherit" }}>
            {playerNames[player.id] || `Player#${player.id}`}
          </h2>
          <FlexContainer color="white">
            <ResourceList
              resourceList={player.bank}
              offsetsPerm={splendidResource.reduce(
                (prev, next) => ({
                  ...prev,
                  [next]: player.purchased?.filter(
                    (card) => card.income === next
                  ).length,
                }),
                {}
              )}
              offsetsTemp={player.bankOffsetTemp}
              hideEmpty
            />
          </FlexContainer>
          <FlexContainer>
            {player.purchased.map((card, j) => (
              <Card key={`player-purchased-card-${j}`} mini {...card} />
            ))}
            <FlexContainer>
              {player.reservedVisible.map((card, j) =>
                isActivePlayer ? (
                  <DeckCard
                    reserved
                    mini
                    key={`player-reserved-vis-card-${j}`}
                    card={card}
                    selected={values.selected}
                  />
                ) : (
                  <Card
                    reserved
                    mini
                    key={`player-reserved-vis-card-${j}`}
                    {...card}
                  />
                )
              )}
              {player.reservedHidden.map((card, j) =>
                isActivePlayer ? (
                  <DeckCard
                    reserved
                    mini
                    key={`player-reserved-hid-card-${j}`}
                    card={card}
                    selected={values.selected}
                  />
                ) : (
                  <Card
                    reserved
                    mini
                    key={`player-reserved-vis-card-${j}`}
                    {...card}
                  />
                )
              )}
            </FlexContainer>
          </FlexContainer>
        </PlayerContainer>
      ))}
    </PlayersContainer>
  );
};

export default Players;
