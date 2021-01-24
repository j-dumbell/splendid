import React from "react";

import "./App.css";

import { useWebSocket, WsResponse, WsStatus } from "./hooks/useWebsocket";
import Actions from "./component/Actions";
import ChatHistory from "./component/ChatHistory";
import Splendid from "./component/Splendid";

function App() {
  const [status, error, actions] = useWebSocket("/");
  const actionHistory = actions as WsResponse[];

  return (
    <>
      <h1>Splendid</h1>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h2>Server {error ? `errored: ${error}` : status}</h2>
          <Actions actions={actionHistory} status={status as WsStatus} />
        </div>
        <ChatHistory actions={actionHistory} />
      </div>
      <Splendid />
    </>
  );
}

export default App;
