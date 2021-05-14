import React from "react";

import { useActivePlayer } from "../../../hooks/useActivePlayer";
import { SplendidPlayer } from "../domain";
import Elites from "../Elites";
import { getScore } from "./util";
import PlayerDeck from "./PlayerDeck";
import PlayerResourceList from "./PlayerResourceList";
import { PlayerContainer, PlayerTitle, PlayerContents } from "./styled";
import { useClientId } from "../../../hooks/useClientId";
import { usePlayerNames } from "../../../hooks/usePlayerNames";

type Props = {
  player: SplendidPlayer;
};

const Player = ({ player }: Props) => {
  const [clientId] = useClientId();
  const [playerNames] = usePlayerNames();
  const [, activePlayerId] = useActivePlayer();
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
      <PlayerResourceList {...player} />
      <PlayerContents column>
        <Elites size="micro" elites={player.elites} />
        <PlayerDeck {...player} />
      </PlayerContents>
    </PlayerContainer>
  );
};

export default Player;
