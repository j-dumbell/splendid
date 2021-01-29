import React from "react";

import { useWebSocket, WsResponse, WsStatus } from "./hooks/useWebsocket";
import Sidebar from "./components/Sidebar";
import Splendid from "./components/Splendid";
import FlexContainer from "./components/common/FlexContainer";

function App() {
  const [status, error, actions] = useWebSocket("/");
  const allActions = actions as WsResponse<any>[];
  return (
    <>
      <h1>Splendid</h1>
      <FlexContainer>
        <Sidebar
          actions={allActions}
          status={status as WsStatus}
          error={error as string}
        />
        <Splendid
          latestAction={allActions.length ? allActions.slice(-1)[0] : undefined}
        />
      </FlexContainer>
    </>
  );
}

export default App;
