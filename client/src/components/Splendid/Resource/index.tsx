import React from "react";

import { ResourceSize, SplendidResource } from "../domain";
import Image from "../../common/Image";
import Ruby from "./ruby.svg";
import Diamond from "./diamond.svg";
import Emerald from "./emerald.svg";
import Onyx from "./onyx.svg";
import Sapphire from "./sapphire.svg";
import Citrine from "./citrine.svg";

type Props = {
  resourceType: SplendidResource;
  size?: ResourceSize;
};

const assetMap = {
  black: Onyx,
  white: Diamond,
  red: Ruby,
  blue: Sapphire,
  green: Emerald,
  yellow: Citrine,
};

const sizeMap = {
  default: "2.5rem",
  mini: "1.25rem",
  micro: "0.75rem",
}

const Resource = ({ resourceType, size }: Props) => (
  <Image
    src={assetMap[resourceType]}
    alt={`${resourceType} resource`}
    width={size ? sizeMap[size] : sizeMap.default}
  />
);

export default Resource;
