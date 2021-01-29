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
  latestAction?: WsResponse<Game>;
};

const Splendid = ({ latestAction }: Props) =>
  latestAction?.details?.game ? (
    <FlexContainer style={{ marginLeft: "50px" }}>
      <Board {...latestAction.details.game.board} />
      <Players
        activePlayerIndex={latestAction.details.game.activePlayerIndex}
        players={latestAction.details.game.players}
      />
    </FlexContainer>
  ) : null;

export default Splendid;
