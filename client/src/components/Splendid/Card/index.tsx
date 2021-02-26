import React from "react";

import { CardSize, SplendidCard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Resource from "../Resource";
import ResourceList from "../ResourceList";
import { CardContainer } from "./styled";

type Props = SplendidCard & {
  size?: CardSize;
  reserved?: boolean;
  shadowed?: boolean;
};

const Card = ({ tier, points, income, cost, size, shadowed, reserved }: Props) => (
  <CardContainer column justify="space-between" tier={tier} size={size} shadowed={shadowed} reserved={reserved} >
    <FlexContainer justify="space-between">
      <div><strong>{Boolean(points) && points}</strong></div>{" "}
      {income && <Resource resourceType={income} size="mini" />}
    </FlexContainer>
    <div>
      {cost && <ResourceList resourceList={cost} hideEmpty size="mini" column />}
    </div>
  </CardContainer>
);

export default Card;
