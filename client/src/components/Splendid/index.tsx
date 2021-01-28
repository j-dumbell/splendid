import React from "react";

import { SplendidBoard, SplendidPlayer } from "./domain";
import FlexContainer from "../common/FlexContainer";
import Board from "./Board";
import Players from "./Players";

// Temporary
import fixtures from "./gameFixtures.json";

const { board, players, activePlayerIndex } = (fixtures as unknown) as {
  activePlayerIndex: number;
  board: SplendidBoard;
  players: SplendidPlayer[];
};

const Splendid = () => (
  <FlexContainer style={{ marginLeft: "50px" }}>
    <Board {...board} />
    <Players activePlayerIndex={activePlayerIndex} players={players} />
  </FlexContainer>
);

export default Splendid;
