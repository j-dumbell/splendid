import React from "react";

import { SplendidCard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Resource from "../Resource";
import ResourceList from "../ResourceList";
import { CardContainer } from "./styled";

type Props = SplendidCard & {
  mini?: boolean;
  reserved?: boolean;
};

const Card = ({ tier, points, income, cost, mini, reserved }: Props) => (
  <CardContainer column justify="space-between" tier={tier} mini={mini} reserved={reserved} >
    <FlexContainer justify="space-between">
      <div>{Boolean(points) && points}</div>{" "}
      {income && <Resource resourceType={income} mini />}
    </FlexContainer>
    <div>
      {cost && <ResourceList resourceList={cost} hideEmpty mini column />}
    </div>
  </CardContainer>
);

export default Card;
