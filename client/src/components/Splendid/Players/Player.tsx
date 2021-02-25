import React from "react";
import { useSelector } from "react-redux";

import { useActivePlayer } from "../../../hooks/useActivePlayer";
import { State } from "../../../state/domain";
import FlexContainer from "../../common/FlexContainer";
import { SplendidPlayer } from "../domain";
import Elites from "../Elites";
import { getScore } from "./helpers";
import PlayerDeck from "./PlayerDeck";
import PlayerResourceForm from "./PlayerResourceForm";
import PlayerResourceList from "./PlayerResourceList";
import { PlayerContainer } from "./styled";

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
      <FlexContainer justify="space-between">
        <h2>{playerNames[player.id] || `Player #${player.id}`}</h2>
        <h2>Points: {getScore(player)}</h2>
      </FlexContainer>
      {isActivePlayer && clientId === player.id ? (
        <PlayerResourceForm {...player} />
      ) : (
        <PlayerResourceList {...player} />
      )}
      <PlayerDeck {...player} />
      <Elites mini elites={player.elites} />
    </PlayerContainer>
  );
};

export default Player;
