import React from "react";
import styled from "styled-components";

import { SplendidBoard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Bank from "../Bank";
import Elites from "../Elites";
import Decks from "../Decks";

const ElitesContainer = styled(FlexContainer)`
  margin-bottom: 20px;
`;

const BoardContainer = styled(FlexContainer)`
  flex: 3;
`;

const Board = ({
  board: { bank, bankOffsetTemp, elites, decks },
}: {
  board: SplendidBoard;
}) => (
  <BoardContainer column justify="center">
    <Bank bank={bank} bankOffsetTemp={bankOffsetTemp} />
    <ElitesContainer justify="center">
      <Elites elites={elites} />
    </ElitesContainer>
    <Decks decks={decks} />
  </BoardContainer>
);

export default Board;
