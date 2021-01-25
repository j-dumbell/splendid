import React from "react";

import Image from "../../common/Image";
import Ruby from "./ruby.svg";
import Diamond from "./diamond.svg";
import Emerald from "./emerald.svg";
import Onyx from "./onyx.svg";
import Sapphire from "./sapphire.svg";
import Citrine from "./citrine.svg";

export const resourceTypes = [
  "black",
  "white",
  "red",
  "blue",
  "green",
  "yellow",
] as const;
export type ResourceType = typeof resourceTypes[number];

type Props = {
  resourceType: ResourceType;
  mini?: boolean;
};

const assetMap = {
  black: Onyx,
  white: Diamond,
  red: Ruby,
  blue: Sapphire,
  green: Emerald,
  yellow: Citrine,
};

const Resource = ({ resourceType, mini }: Props) => (
  <Image
    src={assetMap[resourceType]}
    alt={`${resourceType} resource`}
    width={mini ? "20px" : "50px"}
  />
);

export default Resource;
