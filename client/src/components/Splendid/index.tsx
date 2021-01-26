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
  <FlexContainer column style={{ marginLeft: "50px" }}>
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
                <Card key={`card-${j}`} {...card} />
              ))}
            </FlexContainer>
          );
        })}
    </div>
  </FlexContainer>
);

export default Splendid;
