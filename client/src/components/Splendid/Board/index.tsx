import React from "react";

import { SplendidBoard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Card from "../Card";
import Elite from "../Elite";
import { BoardResourceList as ResourceList } from "../ResourceList";

type Props = SplendidBoard;

const Board = ({ elites, decks, bank }: Props) => (
  <div>
    <FlexContainer color="white">
      <ResourceList resourceList={bank} />
    </FlexContainer>
    <FlexContainer>
      {elites
        .filter((card) => card.id)
        .map((elite, i) => (
          <Elite key={`elite-${i}`} {...elite} />
        ))}
    </FlexContainer>
    <div>
      {Object.keys(decks)
        .reverse()
        .map((tier, i) => (
          <FlexContainer key={`card-container-${i}`}>
            {decks[tier]
              .filter((card) => card.id)
              .map((card, j) => (
                <Card key={`board-card-${j}`} {...card} purchasable />
              ))}
          </FlexContainer>
        ))}
    </div>
  </div>
);

export default Board;
