import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import { SplendidPlayer } from "../domain";
import { PaddedContainer } from "../../common/FlexContainer";
import Player from "./Player";
import { sortPlayers } from "./helpers";

type Props = {
  players: SplendidPlayer[];
};

const Players = ({ players }: Props) => {
  const clientId = useSelector(({ clientId }: State) => clientId);
  return (
    <PaddedContainer column justify="center">
      {sortPlayers(players, clientId).map((player, i) => (
        <Player key={`player-${i}`} player={player} />
      ))}
    </PaddedContainer>
  );
};

export default Players;
