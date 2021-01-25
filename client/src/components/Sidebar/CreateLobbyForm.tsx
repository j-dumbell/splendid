import React from "react";

import { sendJSON } from "../../hooks/useWebsocket";
import { useCookie } from "../../hooks/useCookie";

export const CreateLobbyForm = () => {
  const [lobbyId] = useCookie("lobbyId");
  const [username] = useCookie("username");
  
  if (lobbyId) {
    return null;
  }

  return (
    <button
      onClick={() => sendJSON({ action: "create", params: { name: username } })}
    >
      Create Lobby
    </button>
  );
};

export default CreateLobbyForm;
