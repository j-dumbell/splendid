import React from "react";

import { useLobbyId } from "../../../hooks/useLobbyId";
import { sendJSON } from "../../../hooks/useWebsocket";

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
