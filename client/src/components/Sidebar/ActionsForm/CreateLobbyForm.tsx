import React from "react";

import Button from "../../common/Button";
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
    <Button
      onClick={() => sendJSON({ action: "create", params: { name: username } })}
    >
      Create Lobby
    </Button>
  );
};

export default CreateLobbyForm;
