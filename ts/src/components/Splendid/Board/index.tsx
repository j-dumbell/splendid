import React from "react";
import styled from "styled-components";

import { SplendidBoard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Bank from "./Bank";
import Elites from "../Elites";
import Decks from "../Decks";

const ElitesContainer = styled(FlexContainer)`
  margin-bottom: 20px;
`;

const BoardContainer = styled(FlexContainer)`
  flex: 3;
`;

type Props = {
  board: SplendidBoard;
};

const Board = ({ board: { bank, elites, decks } }: Props) => (
  <BoardContainer column justify="flex-end">
    <Bank bank={bank} />
    <ElitesContainer justify="center">
      <Elites elites={elites} size="big" />
    </ElitesContainer>
    <Decks decks={decks} size="big" />
  </BoardContainer>
);

export default Board;
