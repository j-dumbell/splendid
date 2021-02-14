import React from "react";
import styled from "styled-components";

import { useWebSocket, WsStatus } from "./hooks/useWebsocket";
import Sidebar from "./components/Sidebar";
import Splendid from "./components/Splendid";
import FlexContainer from "./components/common/FlexContainer";

const AppContainer = styled.div`
  padding-left: 30px;
`;

function App() {
  const [status, error] = useWebSocket("/");
  return (
    <AppContainer>
      <h1>Splendid</h1>
      <FlexContainer>
        <Sidebar
          status={status as WsStatus}
          error={error as string}
        />
        <Splendid />
      </FlexContainer>
    </AppContainer>
  );
}

export default App;
