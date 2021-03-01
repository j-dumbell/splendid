import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import History from "./History";

const ActionHistory = () => {
  const { history, playerNames } = useSelector(
    ({ history, playerNames }: State) => ({
      history,
      playerNames,
    })
  );

  const mapped = history.map(({ action, timestamp, details }, i) => ({
    timestamp,
    name: playerNames[details.clientId],
    message: `has ${action}ed`,
  }));

  return <History history={mapped} />;
};

export default ActionHistory;
