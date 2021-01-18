import React from "react";
import JSONPretty from "react-json-pretty";

import "./App.css";
import { MessageForm } from "./component/MessageForm";

import { useWebSocket, chatHistory } from "./hooks/websocket";

const jsonTheme = {
  main: "color:#66d9ef;",
  key: "color:#f92672;",
  string: "color:#fd971f;",
  value: "color:#a6e22e;",
  boolean: "color:#ac81fe;",
};

function App() {
  const [loading, error, data, send] = useWebSocket("/");
  return (
    <>
      <h1>Splendid</h1>
      <MessageForm send={send} />
      <h2>Response</h2>
      <JSONPretty
        data={{ loading, error, data }}
        theme={jsonTheme}
      />
      <h2>Chat History</h2>
      <JSONPretty
        data={chatHistory}
        theme={jsonTheme}
      />
    </>
  );
}

export default App;
