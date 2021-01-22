import React from "react";

import { WsResponse, WsStatus } from "../../hooks/useWebsocket";
import { useCookie } from "../../hooks/useCookie";

import NameForm from "./component/NameForm";
import SendChatForm from "./component/SendChatForm";
import JoinLobbyForm from "./component/JoinLobbyForm";
import CreateLobbyForm from "./component/CreateLobbyForm";
import ExitLobbyButton from "./component/ExitLobbyButton";
import LatestResponse from "./component/LatestResponse";

type ActionProps = {
  actions: WsResponse[];
  status: WsStatus;
};

const Actions = ({ actions, status }: ActionProps) => {
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

export default Actions;
