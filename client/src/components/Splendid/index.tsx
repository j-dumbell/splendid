import React from "react";

import { board, players, activePlayerIndex } from "./gameFixtures.json";

import FlexContainer from "../common/FlexContainer";
import Board from "./Board";
import Players from "./Players";

const Splendid = () => (
  <FlexContainer style={{ marginLeft: "50px" }}>
    <Board elites={board.elites} decks={board.decks} bank={board.bank} />
    <Players activePlayerIndex={activePlayerIndex} players={players} />
  </FlexContainer>
);

export default Splendid;
