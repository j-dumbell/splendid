import React from "react";

import { SplendidBoard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Elite from "../Elite";
import { BoardResourceList as ResourceList } from "../ResourceList";
import Decks from "../Decks";

type Props = SplendidBoard;

const Board = ({ elites, decks, bank }: Props) => (
  <FlexContainer>
    <div>
      <FlexContainer color="white">
        <ResourceList resourceList={bank} />
      </FlexContainer>
    </div>
    <div>
      <FlexContainer>
        {elites
          .filter((card) => card.id)
          .map((elite, i) => (
            <Elite key={`elite-${i}`} {...elite} />
          ))}
      </FlexContainer>
      <Decks decks={decks} />
    </div>
  </FlexContainer>
);

export default Board;
