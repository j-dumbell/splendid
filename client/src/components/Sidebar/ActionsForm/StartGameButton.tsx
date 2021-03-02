import React from "react";

import Button from "../../common/Button";
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
    <Button
      onClick={() =>
        sendJSON({ action: "game", params: { gameAction: "startGame" } })
      }
    >
      Start Game
    </Button>
  );
};

export default StartGameButton;
