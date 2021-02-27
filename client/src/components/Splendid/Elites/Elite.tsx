import React from "react";
import CardResourceList from "../Card/CardResourceList";
import { CardVictoryPoints } from "../Card/styled";

import { SplendidElite, SplendidSize } from "../domain";
import EliteContainer from "./styled";

type Props = SplendidElite & {
  size?: SplendidSize;
};

const Elite = ({ points, cost, size }: Props) => (
  <EliteContainer column size={size} justify="space-between">
    <CardVictoryPoints size={size}>
      {Boolean(points) && points}
    </CardVictoryPoints>
    <CardResourceList cost={cost} size={size} />
  </EliteContainer>
);

export default Elite;
