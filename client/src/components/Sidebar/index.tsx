import React from "react";

import { WsStatus } from "../../hooks/useWebsocket";
import { PaddedChild } from "../common/FlexContainer";
import ActionsForm from "./ActionsForm";
import LatestResponse from "./LatestResponse";
import Chat from "./Chat";

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
    <Chat />
  </PaddedChild>
);

export default Sidebar;
