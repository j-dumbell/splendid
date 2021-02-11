import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import { SplendidPlayer } from "../domain";
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
          <h2 style={{ color: clientId === player.id ? "white" : "inherit" }}>
            {playerNames[player.id] || `Player#${player.id}`}
          </h2>
          <PlayerResourceForm {...player} />
          <PlayerDeck {...player} />
        </PlayerContainer>
      ))}
    </PlayersContainer>
  );
};

export default Players;
