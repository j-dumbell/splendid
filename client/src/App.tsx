import React from "react";

import "./App.css";

import { useWebSocket, WsResponse, WsStatus } from "./hooks/websocket";
import Actions from "./component/Actions";
import ChatHistory from "./component/ChatHistory";

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
    </>
  );
}

export default App;
