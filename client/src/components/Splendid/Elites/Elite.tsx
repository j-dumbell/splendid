import React from "react";

import { SplendidElite } from "../domain";
import ResourceList from "../ResourceList";
import EliteContainer from "./styled";

type Props = SplendidElite & {
  mini?: boolean;
};

const Elite = ({ points, cost, mini }: Props) => (
  <EliteContainer column mini={mini} justify="space-between">
    <strong>{points}</strong>
    <div>
      <ResourceList resourceList={cost} hideEmpty size="mini" column />
    </div>
  </EliteContainer>
);

export default Elite;
