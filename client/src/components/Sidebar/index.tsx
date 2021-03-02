import React from "react";
import styled from "styled-components";

import { FlexChild } from "../common/FlexContainer";
import Text from "../common/Text";
import ActionsForm from "./ActionsForm";
import ActionHistory from "./ActionHistory";
import LatestAction from "./ActionHistory/LatestAction";
import Chat from "./Chat";
import { useConnection } from "../../hooks/useConnection";
import { useCookie } from "../../hooks/useCookie";
import { useLobbyId } from "../../hooks/useLobbyId";

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

const Lobby = ({ lobbyId }: { lobbyId?: string }) => {
  if (!lobbyId) {
    return null;
  }
  return (
    <>
      {` | Lobby `}
      <Text color="#FF917B">{lobbyId}</Text>
    </>
  );
};

const Sidebar = () => {
  const [loading, open, error] = useConnection();
  const [lobbyId] = useLobbyId();
  const [username] = useCookie("username");
  return (
    <SidebarContainer column>
      <h1>Splendid</h1>
      <h3>
        Server{" "}
        {error ? (
          <Text color="red">errored: {error}</Text>
        ) : (
          <Text color={open ? "#81BDA4" : "inherit"}>
            {loading && "loading"} {open ? "open" : "closed"}
          </Text>
        )}
        {open && <Lobby lobbyId={lobbyId} />}
      </h3>
      <h3>
        {open && username && (
          <>
            Welcome back <Text color="#ac81fe">{username}</Text>
            <br />
          </>
        )}
      </h3>
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
