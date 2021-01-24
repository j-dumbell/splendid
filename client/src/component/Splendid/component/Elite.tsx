import React from "react";

import Bank from "./Bank";
import Crown from "./crown.svg";

type EliteProps = {
  id: number;
  points: number;
  cost: Record<string, number>;
};

const Elite = ({ points, cost }: EliteProps) => (
  <div
    style={{
      backgroundColor: "white",
      margin: "5px",
      padding: "5px",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      width: "113px",
      height: "113px",
      borderRadius: "5px",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {points}
      <img src={Crown} alt="crown"  style={{ width: "30px" }} />
    </div>
    <div>
      <Bank bank={cost} hideEmpty mini />
    </div>
  </div>
);

export default Elite;
