import React from "react";

import FlexContainer from "../common/FlexContainer";
import Card from "./Card";
import Elite from "./Elite";
import ResourceList from "./ResourceList";

type Props = {
  elites: any[];
  decks: Record<string, any[]>;
  bank: any;
};

const Board = ({ elites, decks, bank }: Props) => (
  <div>
    <FlexContainer color="white">
      <ResourceList resourceList={bank} />
    </FlexContainer>
    <FlexContainer>
      {elites.map((elite, i) => (
        <Elite key={`elite-${i}`} {...elite} />
      ))}
    </FlexContainer>
    <div>
      {Object.keys(decks)
        .reverse()
        .map((tier, i) => (
          <FlexContainer key={`card-container-${i}`}>
            {decks[tier].map((card, j) => (
              <Card key={`board-card-${j}`} {...card} />
            ))}
          </FlexContainer>
        ))}
    </div>
  </div>
);

export default Board;
