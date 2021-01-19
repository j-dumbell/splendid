import React from "react";

import { sendJSON, WsResponse, WsStatus } from "../../hooks/websocket";
import JoinLobbyForm from "./component/JoinLobbyForm";
import LatestResponse from "./component/LatestResponse";
import SendChatForm from "./component/SendChatForm";

type ActionProps = {
  actions: WsResponse[];
  status: WsStatus;
};

const Actions = ({ actions, status }: ActionProps) =>
  status === "open" ? (
    <>
      <SendChatForm />
      <JoinLobbyForm />
      <button onClick={() => sendJSON({ action: "create" })}>
        Create Lobby
      </button>
      <button onClick={() => sendJSON({ action: "exit" })}>Exit Lobby</button>
      <LatestResponse actions={actions} />
    </>
  ) : null;

export default Actions;
