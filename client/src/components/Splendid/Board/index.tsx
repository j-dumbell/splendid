import React from "react";

import { SplendidBoard } from "../domain";
import { LeftPaddedContainer } from "../../common/FlexContainer";
import Bank from "../Bank";
import Elites from "../Elites";
import Decks from "../Decks";

const Board = ({
  board: { bank, bankOffsetTemp, elites, decks },
}: {
  board: SplendidBoard;
}) => (
  <LeftPaddedContainer column>
    <Bank bank={bank} bankOffsetTemp={bankOffsetTemp} />
    <Elites elites={elites} justify="center" />
    <Decks decks={decks} />
  </LeftPaddedContainer>
);

export default Board;
