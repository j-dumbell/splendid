import React from "react";
import styled from "styled-components";

import fixtures from "./gameFixtures.json";

import FlexContainer from "../common/FlexContainer";
import Card from "./Card";
import Elite from "./Elite";
import ResourceList from "./ResourceList";

const ResourceContainer = styled(FlexContainer)`
  color: white;
`;

const Splendid = () => (
  <FlexContainer style={{ marginLeft: "50px" }}>
    <div>
      <ResourceContainer>
        <ResourceList resourceList={fixtures.board.bank} />
      </ResourceContainer>
      <FlexContainer>
        {fixtures.board.elites.map((elite: any, i) => (
          <Elite key={`elite-${i}`} {...elite} />
        ))}
      </FlexContainer>
      <div>
        {Object.keys(fixtures.board.decks)
          .reverse()
          .map((tier, i) => {
            const cards = (fixtures.board.decks as any)[tier];
            return (
              <FlexContainer key={`card-container-${i}`}>
                {cards.map((card: any, j: number) => (
                  <Card key={`board-card-${j}`} {...card} />
                ))}
              </FlexContainer>
            );
          })}
      </div>
    </div>
    <div>
      <h2>Players</h2>
      {fixtures.players.map((player, i) => (
        <div key={`player-${i}`}>
          <h3>
            {i === fixtures.activePlayerIndex && ">>"} {player.name}
          </h3>
          {player.purchased.length > 0 && (
            <div>
              <h4>Purchased</h4>
              <FlexContainer>
                {(player.purchased as any[]).map((card: any, j) => (
                  <Card key={`player-purchased-card-${j}`} {...card} />
                ))}
              </FlexContainer>
            </div>
          )}
          {player.reservedVisible.length + player.reservedHidden.length > 0 && (
            <div>
              <h4>Reserved</h4>
              <FlexContainer>
                {(player.reservedVisible as any[]).map((card: any, j) => (
                  <Card key={`player-reserved-vis-card-${j}`} {...card} />
                ))}
                {(player.reservedHidden as any[]).map((card: any, j) => (
                  <Card key={`player-reserved-hid-card-${j}`} {...card} />
                ))}
              </FlexContainer>
            </div>
          )}
        </div>
      ))}
    </div>
  </FlexContainer>
);

export default Splendid;
