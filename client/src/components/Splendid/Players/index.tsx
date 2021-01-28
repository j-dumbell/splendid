import React from "react";

import { SplendidPlayer } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Card from "../Card";
import ResourceList from "../ResourceList";

type Props = {
  players: SplendidPlayer[];
  activePlayerIndex: number;
};

const Players = ({ players, activePlayerIndex }: Props) => (
  <div style={{ marginLeft: "50px" }}>
    {players.map((player, i) => (
      <FlexContainer
        column
        key={`player-${i}`}
        style={{
          padding: "10px",
          border: `${i === activePlayerIndex && "solid 2px white"}`,
        }}
      >
        <h2>{player.name}</h2>
        <FlexContainer color="white">
          <ResourceList resourceList={player.bank} purchased={player.purchased} />
        </FlexContainer>
        <FlexContainer>
          {player.purchased.map((card, j) => (
            <Card key={`player-purchased-card-${j}`} mini {...card} />
          ))}
          <FlexContainer style={{ opacity: 0.3 }}>
            {player.reservedVisible.map((card, j) => (
              <Card key={`player-reserved-vis-card-${j}`} mini {...card} />
            ))}
            {player.reservedHidden.map((card, j) => (
              <Card key={`player-reserved-hid-card-${j}`} mini {...card} />
            ))}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    ))}
  </div>
);

export default Players;
