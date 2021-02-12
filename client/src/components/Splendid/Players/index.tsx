import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import FlexContainer from "../../common/FlexContainer";
import { SplendidPlayer } from "../domain";
import { getScore } from "./helpers";
import PlayerDeck from "./PlayerDeck";
import PlayerResourceForm from "./PlayerResourceForm";
import { PlayersContainer, PlayerContainer } from "./styled";

type Props = {
  players: SplendidPlayer[];
  activePlayerIndex: number;
};

const Players = ({ players, activePlayerIndex }: Props) => {
  const { clientId, playerNames } = useSelector(
    ({ clientId, playerNames }: State) => ({
      clientId,
      playerNames,
    })
  );

  return (
    <PlayersContainer>
      {players.map((player, i) => (
        <PlayerContainer
          key={`player-${i}`}
          isActive={i === activePlayerIndex}
          column
        >
          <FlexContainer
            justify="space-between"
            color={clientId === player.id ? "white" : "inherit"}
          >
            <h2>{playerNames[player.id] || `Player #${player.id}`}</h2>
            <h2>
              Points:{" "}
              {getScore(player.purchased)}
            </h2>
          </FlexContainer>
          <PlayerResourceForm {...player} />
          <PlayerDeck {...player} />
        </PlayerContainer>
      ))}
    </PlayersContainer>
  );
};

export default Players;
