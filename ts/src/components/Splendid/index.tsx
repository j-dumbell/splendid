import React from "react";

import { useGame } from "../../hooks/useGame";
import Board from "./Board";
import Players from "./Players";
import { SplendidContainer, SplendidFormContainer } from "./styled";

const Splendid = () => {
  const [, game] = useGame();
  if (!game) {
    return <SplendidContainer />;
  }
  return (
    <SplendidFormContainer>
      <Board board={game.board} />
      <Players players={game.players} />
    </SplendidFormContainer>
  );
};

export default Splendid;
