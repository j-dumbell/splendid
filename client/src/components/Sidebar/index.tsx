import React from "react";

import { WsResponse, WsStatus } from "../../hooks/useWebsocket";
import FlexContainer from "../common/FlexContainer";
import ActionsForm from "./ActionsForm";
import ChatHistory from "./ChatHistory";

type ActionProps = {
  actions: WsResponse[];
  status: WsStatus;
  error?: string;
};

const Sidebar = ({ actions, status, error }: ActionProps) => (
  <FlexContainer column>
    <h2>Server {error ? `errored: ${error}` : status}</h2>
    <ActionsForm actions={actions} status={status} />
    <ChatHistory actions={actions} />
  </FlexContainer>
);

export default Sidebar;
