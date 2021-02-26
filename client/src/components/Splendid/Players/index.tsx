import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import { SplendidPlayer } from "../domain";
import Player from "./Player";
import { sortPlayers } from "./helpers";
import { PlayersContainer } from "./styled";

type Props = {
  players: SplendidPlayer[];
};

const Players = ({ players }: Props) => {
  const clientId = useSelector(({ clientId }: State) => clientId);
  return (
    <PlayersContainer column justify="center">
      {sortPlayers(players, clientId).map((player, i) => (
        <Player key={`player-${i}`} player={player} />
      ))}
    </PlayersContainer>
  );
};

export default Players;
