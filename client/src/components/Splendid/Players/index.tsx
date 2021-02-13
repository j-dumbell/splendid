import React from "react";

import { SplendidPlayer } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Player from "./Player";

type Props = {
  players: SplendidPlayer[];
  activePlayerIndex: number;
};

const Players = ({ players, activePlayerIndex }: Props) => (
  <FlexContainer column justify="flex-end">
    {players.map((player, i) => (
      <Player
        key={`player-${i}`}
        player={player}
        isActive={i === activePlayerIndex}
      />
    ))}
  </FlexContainer>
);

export default Players;
