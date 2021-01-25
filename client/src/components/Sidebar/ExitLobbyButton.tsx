import React from "react";

import { sendJSON } from "../../hooks/useWebsocket";
import { useCookie } from "../../hooks/useCookie";

const ExitLobbyButton = () => {
  const [lobbyId] = useCookie("lobbyId");
  
  if (!lobbyId) {
    return null;
  }

  return (
    <button onClick={() => sendJSON({ action: "exit" })}>Exit Lobby</button>
  );
};

export default ExitLobbyButton;
