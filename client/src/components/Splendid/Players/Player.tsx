import React from "react";
import { useSelector } from "react-redux";

import { useActivePlayer } from "../../../hooks/useActivePlayer";
import { State } from "../../../state/domain";
import { SplendidPlayer } from "../domain";
import Elites from "../Elites";
import { getScore } from "./helpers";
import PlayerDeck from "./PlayerDeck";
import PlayerResourceForm from "./PlayerResourceForm";
import PlayerResourceList from "./PlayerResourceList";
import { PlayerContainer, PlayerTitle, PlayerContents } from "./styled";

type Props = {
  player: SplendidPlayer;
  index: number;
};

const Player = ({ player, index }: Props) => {
  const { playerNames, clientId } = useSelector(
    ({ playerNames, clientId }: State) => ({
      playerNames,
      clientId,
    })
  );
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
