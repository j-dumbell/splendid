import React from "react";
import styled from "styled-components";

import { useWebSocket } from "./hooks/useWebsocket";
import Sidebar from "./components/Sidebar";
import Splendid from "./components/Splendid";
import FlexContainer from "./components/common/FlexContainer";

const AppContainer = styled.div`
  height: 100%;
  > ${FlexContainer} {
    height: 100%;
  }
`;

function App() {
  useWebSocket("/");
  return (
    <AppContainer>
      <FlexContainer>
        <Sidebar />
        <Splendid />
      </FlexContainer>
    </AppContainer>
  );
}

export default App;
