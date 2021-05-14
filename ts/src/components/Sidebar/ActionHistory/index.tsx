import React from "react";
import { useSelector } from "react-redux";

import { usePlayerNames } from "../../../hooks/usePlayerNames";
import { State } from "../../../state/domain";
import History from "./History";

const ActionHistory = () => {
  const [playerNames] = usePlayerNames();
  const history = useSelector(({ history }: State) => history);

  const mapped = history.map(({ action, timestamp, details }, i) => ({
    timestamp,
    name: playerNames[details.clientId],
    message: `has ${action}ed`,
  }));

  return <History history={mapped} />;
};

export default ActionHistory;
