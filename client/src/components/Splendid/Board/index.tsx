import React from "react";

import { SplendidBoard } from "../domain";
import { PaddedContainer } from "../../common/FlexContainer";
import Bank from "../Bank";
import Elites from "../Elites";
import Decks from "../Decks";

const Board = ({
  board: { bank, bankOffsetTemp, elites, decks },
}: {
  board: SplendidBoard;
}) => (
  <PaddedContainer column>
    <Bank bank={bank} bankOffsetTemp={bankOffsetTemp} />
    <Elites elites={elites} />
    <Decks decks={decks} />
  </PaddedContainer>
);

export default Board;
