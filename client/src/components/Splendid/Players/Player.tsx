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
import { PlayerContainer, PlayerTitle } from "./styled";

type Props = {
  player: SplendidPlayer;
};

const Player = ({ player }: Props) => {
  const { playerNames, clientId } = useSelector(
    ({ playerNames, clientId }: State) => ({
      playerNames,
      clientId,
    })
  );
  const [isActivePlayer, activePlayerId] = useActivePlayer();
  return (
    <PlayerContainer isActive={activePlayerId === player.id} column>
      <PlayerTitle justify="space-between">
        <strong>{playerNames[player.id] || `Player #${player.id}`}</strong>
        <strong>Score: {getScore(player)}</strong>
      </PlayerTitle>
      {isActivePlayer && clientId === player.id ? (
        <PlayerResourceForm {...player} />
      ) : (
        <PlayerResourceList {...player} />
      )}
      <Elites mini elites={player.elites} />
      <PlayerDeck {...player} />
    </PlayerContainer>
  );
};

export default Player;
