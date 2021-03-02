import React from "react";
import styled from "styled-components";

import { FlexChild } from "../common/FlexContainer";
import Text from "../common/Text";
import ActionsForm from "./ActionsForm";
import ActionHistory from "./ActionHistory";
import LatestAction from "./ActionHistory/LatestAction";
import Chat from "./Chat";
import { useConnection } from "../../hooks/useConnection";

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

const Sidebar = () => {
  const [loading, open, error] = useConnection();
  return (
    <SidebarContainer column>
      <h1>Splendid</h1>
      <h2>
        Server{" "}
        {error ? (
          <Text color="red">errored: {error}</Text>
        ) : (
          <Text color={open ? "#81BDA4" : "inherit"}>
            {loading && "loading"} {open ? "open" : "closed"}
          </Text>
        )}
      </h2>
      {open && (
        <>
          <ActionsForm />
          <LatestAction />
          <ActionHistory />
          <Chat />
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
