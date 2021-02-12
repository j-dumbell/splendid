import React from "react";

import { SplendidBoard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Bank from "../Bank";
import Elites from "../Elites";
import Decks from "../Decks";

const Board = ({
  board: { bank, bankOffsetTemp, elites, decks },
}: {
  board: SplendidBoard;
}) => (
  <FlexContainer column>
    <Bank bank={bank} bankOffsetTemp={bankOffsetTemp} />
    <Elites elites={elites} />
    <Decks decks={decks} />
  </FlexContainer>
);

export default Board;
