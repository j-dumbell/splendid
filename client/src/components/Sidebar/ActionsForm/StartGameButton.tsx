import React from "react";

import { useGame } from "../../../hooks/useGame";
import { useLobbyId } from "../../../hooks/useLobbyId";
import { sendJSON } from "../../../hooks/useWebsocket";

const StartGameButton = () => {
  const [lobbyId] = useLobbyId();
  const [game] = useGame();
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
