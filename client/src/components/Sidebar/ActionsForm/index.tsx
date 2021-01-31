import React from "react";

import { useCookie } from "../../../hooks/useCookie";

import NameForm from "./NameForm";
import SendChatForm from "./SendChatForm";
import JoinLobbyForm from "./JoinLobbyForm";
import CreateLobbyForm from "./CreateLobbyForm";
import ExitLobbyButton from "./ExitLobbyButton";
import StartGameButton from "./StartGameButton";

const ActionsForm = () => {
  const [username] = useCookie("username");
  return (
    <>
      <NameForm />
      {username && (
        <>
          <CreateLobbyForm />
          <JoinLobbyForm />
        </>
      )}
      <ExitLobbyButton />
      <StartGameButton />
      <SendChatForm />
    </>
  );
};

export default ActionsForm;
