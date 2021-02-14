import React from "react";

import { SplendidPlayer } from "../domain";
import { PaddedContainer } from "../../common/FlexContainer";
import Player from "./Player";

type Props = {
  players: SplendidPlayer[];
};

const Players = ({ players }: Props) => (
  <PaddedContainer column justify="flex-end">
    {players.map((player, i) => (
      <Player
        key={`player-${i}`}
        player={player}
      />
    ))}
  </PaddedContainer>
);

export default Players;
