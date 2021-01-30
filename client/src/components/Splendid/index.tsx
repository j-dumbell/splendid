import React from "react";
import { useSelector } from "react-redux";

import FlexContainer from "../common/FlexContainer";
import Board from "./Board";
import Players from "./Players";

import { State } from "../../state/domain";

const Splendid = () => {
  const game = useSelector(({ game }: State) => game);
  if (!game) {
    return null;
  }
  return (
    <FlexContainer style={{ marginLeft: "50px" }}>
      <Board {...game.board} />
      <Players
        activePlayerIndex={game.activePlayerIndex}
        players={game.players}
      />
    </FlexContainer>
  );
};

export default Splendid;
