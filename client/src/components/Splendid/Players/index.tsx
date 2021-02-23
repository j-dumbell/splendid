import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import { SplendidPlayer } from "../domain";
import { LeftPaddedContainer } from "../../common/FlexContainer";
import Player from "./Player";
import { sortPlayers } from "./helpers";

type Props = {
  players: SplendidPlayer[];
};

const Players = ({ players }: Props) => {
  const clientId = useSelector(({ clientId }: State) => clientId);
  return (
    <LeftPaddedContainer column justify="flex-end">
      {sortPlayers(players, clientId).map((player, i) => (
        <Player key={`player-${i}`} player={player} />
      ))}
    </LeftPaddedContainer>
  );
};

export default Players;
