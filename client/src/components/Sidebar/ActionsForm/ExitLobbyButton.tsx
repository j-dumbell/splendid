import React from "react";

import Button from "../../common/Button";
import { useLobbyId } from "../../../hooks/useLobbyId";
import { sendJSON } from "../../../hooks/useWebsocket";

const ExitLobbyButton = () => {
  const [lobbyId] = useLobbyId();
  if (!lobbyId) {
    return null;
  }
  return (
    <Button onClick={() => sendJSON({ action: "exit" })}>Exit Lobby</Button>
  );
};

export default ExitLobbyButton;
