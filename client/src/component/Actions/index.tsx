import React from "react";

import { sendJSON, WsResponse, WsStatus } from "../../hooks/websocket";
import SendChatForm from "./component/SendChatForm";
import JoinLobbyForm from "./component/JoinLobbyForm";
import CreateLobbyForm from "./component/CreateLobbyForm";
import LatestResponse from "./component/LatestResponse";

type ActionProps = {
  actions: WsResponse[];
  status: WsStatus;
};

const Actions = ({ actions, status }: ActionProps) =>
  status === "open" ? (
    <>
      <SendChatForm />
      <JoinLobbyForm />
      <CreateLobbyForm />
      <button onClick={() => sendJSON({ action: "exit" })}>Exit Lobby</button>
      <LatestResponse actions={actions} />
    </>
  ) : null;

export default Actions;
