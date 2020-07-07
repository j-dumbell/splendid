import React from "react";
import { useAsyncFetchData } from "./hooks/fetch";

function App() {
  const [loading, error, data] = useAsyncFetchData("/health");
  return (
    <>
      <header>
        <h1>Splendid</h1>
      </header>
      <p>Loading: {JSON.stringify(loading)}</p>
      <p>Data: {JSON.stringify(error || data)}</p>
    </>
  );
}

export default App;
