import React from "react";
import JSONPretty from "react-json-pretty";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import Scrollable from "../../common/Scrollable";

const jsonTheme = {
  main: "color:#66d9ef;",
  key: "color:#f92672;",
  string: "color:#fd971f;",
  value: "color:#a6e22e;",
  boolean: "color:#ac81fe;",
};

const LatestResponse = () => {
  const history = useSelector(({ history }: State) => history);
  if (!history.length) {
    return null;
  }
  return (
    <>
      <h3>Latest Response</h3>
      <Scrollable>
        <JSONPretty data={history.slice(-1)} theme={jsonTheme} />
      </Scrollable>
    </>
  );
};

export default LatestResponse;
