import React from "react";

import { useClient } from "../../../hooks/useClient";
import { SplendidPlayer } from "../domain";
import Player from "./Player";
import { sortPlayers } from "./util";
import { PlayersContainer } from "./styled";

type Props = {
  players: SplendidPlayer[];
};

const Players = ({ players }: Props) => {
  const [, clientId] = useClient();
  return (
    <PlayersContainer column justify="flex-end">
      {sortPlayers(players, clientId).map((player, i) => (
        <Player key={`player-${i}`} player={player} />
      ))}
    </PlayersContainer>
  );
};

export default Players;
