import React from "react";
import CardResourceList from "../Card/CardResourceList";
import { CardVictoryPoints } from "../Card/styled";

import { SplendidElite, SplendidSize } from "../domain";
import EliteContainer from "./styled";

type Props = {
  elite: SplendidElite;
  size?: SplendidSize;
};

const Elite = ({ elite, size }: Props) => (
  <EliteContainer column size={size} justify="space-between">
    <CardVictoryPoints size={size}>
      {Boolean(elite.points) && elite.points}
    </CardVictoryPoints>
    <CardResourceList cost={elite.cost} size={size} />
  </EliteContainer>
);

export default Elite;
