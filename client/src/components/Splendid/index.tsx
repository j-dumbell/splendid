import React from "react";

import { SplendidBoard, SplendidPlayer } from "./domain";
import FlexContainer from "../common/FlexContainer";
import Board from "./Board";
import Players from "./Players";

import { WsResponse } from "../../hooks/useWebsocket";

type Game = {
  activePlayerIndex: number;
  board: SplendidBoard;
  players: SplendidPlayer[];
};

type Props = {
  actions: WsResponse<any>[];
};

const Splendid = ({ actions }: Props) => {
  const gameAction: WsResponse<Game> = actions
    ?.filter(({ action }) => action === "game")
    ?.slice(-1)[0];

  if (!gameAction) {
    return null;
  }

  const {
    details: { game },
  } = gameAction;
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
