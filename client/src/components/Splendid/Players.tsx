import React from "react";

import FlexContainer from "../common/FlexContainer";
import Card from "./Card";
import ResourceList from "./ResourceList";

type Props = {
  players: any[];
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
          <ResourceList resourceList={player.bank} />
        </FlexContainer>
        <FlexContainer>
          {(player.purchased as any[]).map((card: any, j) => (
            <Card key={`player-purchased-card-${j}`} {...card} />
          ))}
          <FlexContainer style={{ opacity: 0.3 }}>
            {(player.reservedVisible as any[]).map((card: any, j) => (
              <Card key={`player-reserved-vis-card-${j}`} {...card} />
            ))}
            {(player.reservedHidden as any[]).map((card: any, j) => (
              <Card key={`player-reserved-hid-card-${j}`} {...card} />
            ))}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    ))}
  </div>
);

export default Players;
