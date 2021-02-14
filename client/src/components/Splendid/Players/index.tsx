import React from "react";

import { SplendidPlayer } from "../domain";
import { LeftPaddedContainer } from "../../common/FlexContainer";
import Player from "./Player";

type Props = {
  players: SplendidPlayer[];
};

const Players = ({ players }: Props) => (
  <LeftPaddedContainer column justify="flex-end">
    {players.map((player, i) => (
      <Player
        key={`player-${i}`}
        player={player}
      />
    ))}
  </LeftPaddedContainer>
);

export default Players;
