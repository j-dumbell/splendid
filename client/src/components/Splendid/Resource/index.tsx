import React from "react";

import Image from '../../common/Image';
import Ruby from "./ruby.svg";
import Diamond from "./diamond.svg";
import Emerald from "./emerald.svg";
import Onyx from "./onyx.svg";
import Sapphire from "./sapphire.svg";
import Citrine from "./citrine.svg";

export type ResourceType =
  | "black"
  | "white"
  | "red"
  | "blue"
  | "green"
  | "yellow";

type Props = {
  resourceType: ResourceType;
  mini?: boolean;
};

const Resource = ({ resourceType, mini }: Props) => {
  const assetMap = {
    black: Onyx,
    white: Diamond,
    red: Ruby,
    blue: Sapphire,
    green: Emerald,
    yellow: Citrine,
  };
  return (
    <Image
      src={assetMap[resourceType]}
      alt={`${resourceType} resource`}
      width={mini ? "20px" : "50px"}
    />
  );
};

export default Resource;
