import React from "react";

import { WsStatus } from "../../hooks/useWebsocket";
import { useCookie } from "../../hooks/useCookie";

import NameForm from "./NameForm";
import SendChatForm from "./SendChatForm";
import JoinLobbyForm from "./JoinLobbyForm";
import CreateLobbyForm from "./CreateLobbyForm";
import ExitLobbyButton from "./ExitLobbyButton";
import LatestResponse from "./LatestResponse";

type ActionProps = {
  status: WsStatus;
};

const ActionsForm = ({ status }: ActionProps) => {
  const [username] = useCookie("username");

  return status === "open" ? (
    <>
      <NameForm />
      {username && (
        <>
          <CreateLobbyForm />
          <JoinLobbyForm />
        </>
      )}
      <ExitLobbyButton />
      <SendChatForm />
      <LatestResponse />
    </>
  ) : null;
};

export default ActionsForm;
