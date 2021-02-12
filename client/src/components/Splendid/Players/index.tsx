import React from "react";

import { SplendidPlayer } from "../domain";
import { PlayersContainer } from "./styled";
import Player from "./Player";

type Props = {
  players: SplendidPlayer[];
  activePlayerIndex: number;
};

const Players = ({ players, activePlayerIndex }: Props) => (
  <PlayersContainer>
    {players.map((player, i) => (
      <Player
        key={`player-${i}`}
        player={player}
        isActive={i === activePlayerIndex}
      />
    ))}
  </PlayersContainer>
);

export default Players;
