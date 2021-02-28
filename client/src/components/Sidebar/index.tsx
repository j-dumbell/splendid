import React from "react";
import styled from "styled-components";

import { WsStatus } from "../../hooks/useWebsocket";
import { FlexChild } from "../common/FlexContainer";
import Text from "../common/Text";
import ActionsForm from "./ActionsForm";
import ActionHistory from "./ActionHistory";
import Chat from "./Chat";

type ActionProps = {
  status: WsStatus;
  error?: string;
};

const SidebarContainer = styled(FlexChild)`
  padding: 0 20px;
  background-color: #272822;
  height: 100%;
  
  & button,
  form button,
  form input[type="text"] {
    font-family: monospace;
    margin: 0 0 5px;
  }
`;

const Sidebar = ({ status, error }: ActionProps) => (
  <SidebarContainer column>
    <h1>Splendid</h1>
    <h2>
      Server{" "}
      {error ? (
        <Text color="red">errored: {error}</Text>
      ) : (
        <Text color={status === "open" ? "#81BDA4" : "inherit"}>{status}</Text>
      )}
    </h2>
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
