import React from "react";

import { SplendidElite } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Image from "../../common/Image";
import ResourceList from "../ResourceList";
import EliteContainer from "./styled";
import Crown from "./crown.svg";

type Props = SplendidElite;

const Elite = ({ points, cost }: Props) => (
  <EliteContainer column justify="space-between">
    <FlexContainer justify="space-between">
      {points}
      <Image src={Crown} alt="crown" width="2rem" />
    </FlexContainer>
    <div>
      <ResourceList resourceList={cost} hideEmpty mini column />
    </div>
  </EliteContainer>
);

export default Elite;
