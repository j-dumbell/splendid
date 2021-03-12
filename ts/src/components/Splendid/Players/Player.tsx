import React from "react";

import { useActivePlayer } from "../../../hooks/useActivePlayer";
import { SplendidPlayer } from "../domain";
import Elites from "../Elites";
import { getScore } from "./util";
import PlayerDeck from "./PlayerDeck";
import PlayerResourceForm from "./PlayerResourceForm";
import PlayerResourceList from "./PlayerResourceList";
import { PlayerContainer, PlayerTitle, PlayerContents } from "./styled";
import { useClient } from "../../../hooks/useClient";

type Props = {
  player: SplendidPlayer;
};

const Player = ({ player }: Props) => {
  const [playerNames, clientId] = useClient();
  const [isActivePlayer, activePlayerId] = useActivePlayer();
  const isActiveClient = Boolean(clientId === player.id);
  return (
    <PlayerContainer
      isActivePlayer={activePlayerId === player.id}
      isActiveClient={isActiveClient}
      column
      tabIndex={0}
    >
      <PlayerTitle justify="space-between">
        <strong>{playerNames[player.id] || `Player #${player.id}`}</strong>
        <strong>Score: {getScore(player)}</strong>
      </PlayerTitle>
      {isActiveClient && isActivePlayer ? (
        <PlayerResourceForm {...player} />
      ) : (
        <PlayerResourceList {...player} />
      )}
      <PlayerContents column>
        <Elites size="micro" elites={player.elites} />
        <PlayerDeck {...player} />
      </PlayerContents>
    </PlayerContainer>
  );
};

export default Player;
