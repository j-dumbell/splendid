import React from "react";

import { WsResponse, WsStatus } from "../../hooks/useWebsocket";
import { useCookie } from "../../hooks/useCookie";

import NameForm from "./NameForm";
import SendChatForm from "./SendChatForm";
import JoinLobbyForm from "./JoinLobbyForm";
import CreateLobbyForm from "./CreateLobbyForm";
import ExitLobbyButton from "./ExitLobbyButton";
import LatestResponse from "./LatestResponse";

type ActionProps = {
  actions: WsResponse<any>[];
  status: WsStatus;
};

const ActionsForm = ({ actions, status }: ActionProps) => {
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
      <LatestResponse actions={actions} />
    </>
  ) : null;
};

export default ActionsForm;
