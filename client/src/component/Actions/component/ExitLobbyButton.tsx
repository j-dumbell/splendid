import React from "react";

import { sendJSON } from "../../../hooks/useWebsocket";
import { useLobbyId } from "../../../hooks/useLobbyId";

const ExitLobbyButton = () => {
  const [lobbyId] = useLobbyId();
  if (!lobbyId) {
    return null;
  }

  return (
    <button onClick={() => sendJSON({ action: "exit" })}>Exit Lobby</button>
  );
};

export default ExitLobbyButton;
