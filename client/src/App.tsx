import React from "react";
import JSONPretty from "react-json-pretty";

import "./App.css";

import { useWebSocket } from "./hooks/websocket";
import { MessageForm } from "./component/MessageForm";

function App() {
  const [loading, error, data, send] = useWebSocket("/");
  return (
    <>
      <h1>Splendid</h1>
      <MessageForm send={send} />
      <JSONPretty
        data={{ loading, error, data }}
        theme={{
          main: "color:#66d9ef;",
          key: "color:#f92672;",
          string: "color:#fd971f;",
          value: "color:#a6e22e;",
          boolean: "color:#ac81fe;",
        }}
      />
    </>
  );
}

export default App;
