import React from "react";

import { sendJSON } from "../../../hooks/useWebsocket";
import { useCookie } from "../../../hooks/useCookie";
import { useLobbyId } from "../../../hooks/useLobbyId";

export const CreateLobbyForm = () => {
  const [username] = useCookie("username");
  const [lobbyId] = useLobbyId();
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
