import React from "react";
import styled from "styled-components";

import { FlexChild } from "../common/FlexContainer";
import ActionsForm from "./ActionsForm";
import ActionHistory from "./ActionHistory";
import LatestAction from "./ActionHistory/LatestAction";
import Chat from "./Chat";
import Header from "./Header";
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
  const [, open] = useConnection();
  return (
    <SidebarContainer column>
      <Header />
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
