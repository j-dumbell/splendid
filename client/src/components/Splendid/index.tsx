import React from "react";

import fixtures from "./gameFixtures.json";

import FlexContainer from "../common/FlexContainer";
import Card from "./Card";
import Elite from "./Elite";
import ResourceList from "./ResourceList";

const Splendid = () => (
  <FlexContainer column>
    <FlexContainer style={{ color: "white" }}>
      <ResourceList resourceList={fixtures.board.bank} />
    </FlexContainer>
    <FlexContainer>
      {fixtures.board.elites.map((elite) => (
        <Elite {...(elite as any)} />
      ))}
    </FlexContainer>
    <div>
      {Object.keys(fixtures.board.decks)
        .reverse()
        .map((tier) => {
          const cards = (fixtures.board.decks as any)[tier];
          return (
            <FlexContainer>
              {cards.map((card: any) => (
                <Card {...card} />
              ))}
            </FlexContainer>
          );
        })}
    </div>
  </FlexContainer>
);

export default Splendid;
