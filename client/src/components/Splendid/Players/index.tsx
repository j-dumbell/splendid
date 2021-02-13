import React from "react";

import { SplendidPlayer } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Player from "./Player";

type Props = {
  players: SplendidPlayer[];
};

const Players = ({ players }: Props) => (
  <FlexContainer column justify="flex-end">
    {players.map((player, i) => (
      <Player
        key={`player-${i}`}
        player={player}
      />
    ))}
  </FlexContainer>
);

export default Players;
