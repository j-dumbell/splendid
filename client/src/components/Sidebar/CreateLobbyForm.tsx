import React from "react";
import { useSelector } from "react-redux";

import { sendJSON } from "../../hooks/useWebsocket";
import { useCookie } from "../../hooks/useCookie";
import { State } from "../../state/domain";

export const CreateLobbyForm = () => {
  const lobbyId = useSelector(({ lobbyId }: State) => lobbyId);
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
