import React from "react";

import { WsStatus } from "../../hooks/useWebsocket";
import { FlexChild } from "../common/FlexContainer";
import ActionsForm from "./ActionsForm";
import ActionHistory from "./ActionHistory";
import Chat from "./Chat";
import styled from "styled-components";

type ActionProps = {
  status: WsStatus;
  error?: string;
};

const SidebarContainer = styled(FlexChild)`
  padding: 0 20px;
  background-color: #272822;
  height: 100%;
`;

const Sidebar = ({ status, error }: ActionProps) => (
  <SidebarContainer column>
    <h1>Splendid</h1>
    <h2>Server {error ? `errored: ${error}` : status}</h2>
    {status === "open" && (
      <>
        <ActionsForm />
        <ActionHistory />
        <Chat />
      </>
    )}
  </SidebarContainer>
);

export default Sidebar;
