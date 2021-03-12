import React from "react";
import { useSelector } from "react-redux";
import JSONPretty from "react-json-pretty";

import { State } from "../../../state/domain";
import Scrollable from "../../common/Scrollable";

const jsonTheme = {
  main: "color:#66d9ef;",
  key: "color:#f92672;",
  string: "color:#fd971f;",
  value: "color:#a6e22e;",
  boolean: "color:#ac81fe;",
};

const LatestAction = () => {
  const latestAction = useSelector<State>(({ latestAction }) => latestAction);
  if (!latestAction) {
    return null;
  }

  return (
    <Scrollable>
      <JSONPretty data={latestAction} theme={jsonTheme} />
    </Scrollable>
  );
};

export default LatestAction;
