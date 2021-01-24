import React from "react";
import { Resource } from "../domain";
import Gem from "./Gem";
import Bank from "./Bank";

type CardProps = {
  id: number;
  tier: number;
  points: number;
  income: Resource;
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
      {points} <Gem colour={income} mini />
    </div>
    <div>
      <Bank bank={cost} hideEmpty mini />
    </div>
  </div>
);

export default Card;
