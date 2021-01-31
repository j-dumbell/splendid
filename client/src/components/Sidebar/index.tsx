import React from "react";

import { WsStatus } from "../../hooks/useWebsocket";
import FlexContainer from "../common/FlexContainer";
import ActionsForm from "./ActionsForm";
import LatestResponse from "./LatestResponse";
import ChatHistory from "./ChatHistory";

type ActionProps = {
  status: WsStatus;
  error?: string;
};

const Sidebar = ({ status, error }: ActionProps) => (
  <FlexContainer column>
    <h2>Server {error ? `errored: ${error}` : status}</h2>
    {status === "open" && (
      <>
        <ActionsForm />
        <LatestResponse />
      </>
    )}
    <ChatHistory />
  </FlexContainer>
);

export default Sidebar;
