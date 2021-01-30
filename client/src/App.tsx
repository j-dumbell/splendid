import React from "react";

import { useWebSocket, WsResponse, WsStatus } from "./hooks/useWebsocket";
import Sidebar from "./components/Sidebar";
import Splendid from "./components/Splendid";
import FlexContainer from "./components/common/FlexContainer";

function App() {
  const [status, error, actions] = useWebSocket("/");
  return (
    <>
      <h1>Splendid</h1>
      <FlexContainer>
        <Sidebar
          actions={actions as WsResponse<any>[]}
          status={status as WsStatus}
          error={error as string}
        />
        <Splendid />
      </FlexContainer>
    </>
  );
}

export default App;
