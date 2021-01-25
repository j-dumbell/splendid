import React from "react";
import { ResourceType } from "./Resource";
import Gem from "./Resource";
import ResourceList from "./ResourceList";

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
  <div
    style={{
      margin: "5px",
      padding: "5px",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      backgroundColor: tiers[tier],
      width: "80px",
      height: "120px",
      borderRadius: "5px",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {points} <Gem resourceType={income} mini />
    </div>
    <div>
      <ResourceList resourceList={cost} hideEmpty mini />
    </div>
  </div>
);

export default Card;
