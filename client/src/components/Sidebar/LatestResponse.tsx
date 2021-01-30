import React from "react";
import JSONPretty from "react-json-pretty";
import { useSelector } from "react-redux";

import { State } from "../../state/domain";

const jsonTheme = {
  main: "color:#66d9ef;",
  key: "color:#f92672;",
  string: "color:#fd971f;",
  value: "color:#a6e22e;",
  boolean: "color:#ac81fe;",
};

const LatestResponse = () => {
  const history = useSelector((state: State) => state.history);
  if (!history.length) {
    return null;
  }
  return (
    <>
      <h2>Latest Response</h2>
      <JSONPretty data={history.slice(-1)} theme={jsonTheme} />
    </>
  );
};

export default LatestResponse;
