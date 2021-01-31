import React from "react";
import { useSelector } from "react-redux";

import { sendJSON } from "../../../hooks/useWebsocket";
import { State } from "../../../state/domain";

const StartGameButton = () => {
  const { lobbyId, game } = useSelector(({ lobbyId, game }: State) => ({
    lobbyId,
    game,
  }));
  if (!lobbyId || game) {
    return null;
  }
  return (
    <button
      onClick={() =>
        sendJSON({ action: "game", params: { gameAction: "startGame" } })
      }
    >
      Start Game
    </button>
  );
};

export default StartGameButton;
