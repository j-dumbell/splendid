import React from "react";
import JSONPretty from "react-json-pretty";

import { WsResponse } from "../../../hooks/useWebsocket";
import WrappedPreformatted from "./styled";

type LatestResponseProps = {
  actions: WsResponse[];
};

const jsonTheme = {
  main: "color:#66d9ef;",
  key: "color:#f92672;",
  string: "color:#fd971f;",
  value: "color:#a6e22e;",
  boolean: "color:#ac81fe;",
};

const LatestResponse = ({ actions }: LatestResponseProps) =>
  actions.length ? (
    <WrappedPreformatted>
      <h2>Latest Response</h2>
      <JSONPretty data={actions.slice(-1)} theme={jsonTheme} />
    </WrappedPreformatted>
  ) : null;

export default LatestResponse;
