import React from "react";

import FlexContainer from "../../common/FlexContainer";
import Resource, { ResourceType } from "../Resource";
import ResourceList from "../ResourceList";

type CardProps = {
  id: number;
  tier: number;
  points: number;
  income: ResourceType;
  cost: Record<string, number>;
};

const tiers: Record<string, string> = {
  1: "#A9DE4C",
  2: "#F4D83B",
  3: "#54BEFA",
};

const Card = ({ tier, points, income, cost }: CardProps) => (
  <FlexContainer
    column
    justify="space-between"
    style={{
      margin: "5px",
      padding: "5px",
      backgroundColor: tiers[tier],
      width: "80px",
      height: "120px",
      borderRadius: "5px",
    }}
  >
    <FlexContainer justify="space-between">
      {points} <Resource resourceType={income} mini />
    </FlexContainer>
    <div>
      <ResourceList resourceList={cost} hideEmpty mini />
    </div>
  </FlexContainer>
);

export default Card;
