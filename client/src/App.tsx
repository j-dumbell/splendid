import React from "react";

import { useWebSocket, WsResponse, WsStatus } from "./hooks/useWebsocket";
import FlexContainer from "./components/common/FlexContainer";
import Actions from "./components/Actions";
import ChatHistory from "./components/ChatHistory";
import Splendid from "./components/Splendid";

function App() {
  const [status, error, actions] = useWebSocket("/");
  const actionHistory = actions as WsResponse[];

  return (
    <>
      <h1>Splendid</h1>
      <FlexContainer>
        <div style={{ flex: 1 }}>
          <h2>Server {error ? `errored: ${error}` : status}</h2>
          <Actions actions={actionHistory} status={status as WsStatus} />
        </div>
        <ChatHistory actions={actionHistory} />
      </FlexContainer>
      <Splendid />
    </>
  );
}

export default App;
