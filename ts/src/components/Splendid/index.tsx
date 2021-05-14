import React from "react";

import { useGame } from "../../hooks/useGame";
import Board from "./Board";
import Players from "./Players";
import { SplendidContainer } from "./styled";

const Splendid = () => {
  const [, game] = useGame();
  return (
    <SplendidContainer>
      {game && (
        <>
          <Board board={game.board} />
          <Players players={game.players} />
        </>
      )}
    </SplendidContainer>
  );
};

export default Splendid;
