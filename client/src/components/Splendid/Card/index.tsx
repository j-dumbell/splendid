import React from "react";

import FlexContainer from "../../common/FlexContainer";
import Resource, { ResourceType } from "../Resource";
import ResourceList from "../ResourceList";
import CardContainer from "./styled";

type CardProps = {
  id?: number;
  tier: number;
  points?: number;
  income?: ResourceType;
  cost?: Record<string, number>;
};

const Card = ({ tier, points, income, cost }: CardProps) => (
  <CardContainer column justify="space-between" tier={tier}>
    <FlexContainer justify="space-between">
      <div>{Boolean(points) && points}</div> {income && <Resource resourceType={income} mini />}
    </FlexContainer>
    <div>
      {cost && <ResourceList resourceList={cost} hideEmpty mini />}
    </div>
  </CardContainer>
);

export default Card;
