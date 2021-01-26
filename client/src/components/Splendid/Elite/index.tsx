import React from "react";

import FlexContainer from "../../common/FlexContainer";
import Image from "../../common/Image";
import ResourceList from "../ResourceList";
import EliteContainer from "./styled";
import Crown from "./crown.svg";

type EliteProps = {
  id: number;
  points: number;
  cost: Record<string, number>;
};

const Elite = ({ points, cost }: EliteProps) => (
  <EliteContainer column justify="space-between">
    <FlexContainer justify="space-between">
      {points}
      <Image src={Crown} alt="crown" width="30px" />
    </FlexContainer>
    <div>
      <ResourceList resourceList={cost} hideEmpty mini />
    </div>
  </EliteContainer>
);

export default Elite;
