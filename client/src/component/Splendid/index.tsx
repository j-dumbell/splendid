import React from "react";

import fixtures from "./gameFixtures.json";
import Bank from "./component/Bank";

const Splendid = () => (
  <>
    <h1>Splendid</h1>
    <Bank bank={fixtures.board.bank} />
  </>
);

export default Splendid;
