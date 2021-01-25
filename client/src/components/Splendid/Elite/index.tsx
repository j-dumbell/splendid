import React from "react";

import FlexContainer from "../../common/FlexContainer";
import Image from "../../common/Image";
import ResourceList from "../ResourceList";
import Crown from "./crown.svg";

type EliteProps = {
  id: number;
  points: number;
  cost: Record<string, number>;
};

const Elite = ({ points, cost }: EliteProps) => (
  <FlexContainer
    column
    justify="space-between"
    style={{
      backgroundColor: "white",
      margin: "5px",
      padding: "5px",
      width: "113px",
      height: "113px",
      borderRadius: "5px",
    }}
  >
    <FlexContainer justify="space-between">
      {points}
      <Image src={Crown} alt="crown" width="30px" />
    </FlexContainer>
    <div>
      <ResourceList resourceList={cost} hideEmpty mini />
    </div>
  </FlexContainer>
);

export default Elite;
