import React from "react";
import styled from "styled-components";

import { SplendidBoard } from "../domain";
import FlexContainer, { PaddedContainer } from "../../common/FlexContainer";
import Bank from "../Bank";
import Elites from "../Elites";
import Decks from "../Decks";

const ElitesContainer = styled(FlexContainer)`
  margin-bottom: 20px;
`;

const Board = ({
  board: { bank, bankOffsetTemp, elites, decks },
}: {
  board: SplendidBoard;
}) => (
  <PaddedContainer column justify="center">
    <Bank bank={bank} bankOffsetTemp={bankOffsetTemp} />
    <ElitesContainer justify="center">
      <Elites elites={elites} />
    </ElitesContainer>
    <Decks decks={decks} />
  </PaddedContainer>
);

export default Board;
