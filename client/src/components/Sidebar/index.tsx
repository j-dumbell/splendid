import React from "react";

import { WsStatus } from "../../hooks/useWebsocket";
import { PaddedChild } from "../common/FlexContainer";
import ActionsForm from "./ActionsForm";
import LatestResponse from "./LatestResponse";
import ChatHistory from "./ChatHistory";

type ActionProps = {
  status: WsStatus;
  error?: string;
};

const Sidebar = ({ status, error }: ActionProps) => (
  <PaddedChild column>
    <h2>Server {error ? `errored: ${error}` : status}</h2>
    {status === "open" && (
      <>
        <ActionsForm />
        <LatestResponse />
      </>
    )}
    <ChatHistory />
  </PaddedChild>
);

export default Sidebar;
