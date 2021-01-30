import React from "react";
import { useSelector } from "react-redux";

import { sendJSON } from "../../hooks/useWebsocket";
import { State } from "../../state/domain";

const ExitLobbyButton = () => {
  const lobbyId = useSelector(({ lobbyId }: State) => lobbyId);
  if (!lobbyId) {
    return null;
  }
  return (
    <button onClick={() => sendJSON({ action: "exit" })}>Exit Lobby</button>
  );
};

export default ExitLobbyButton;
