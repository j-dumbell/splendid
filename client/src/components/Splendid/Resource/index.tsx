import React from "react";

import { SplendidResource } from "../domain";
import Image from "../../common/Image";
import Ruby from "./ruby.svg";
import Diamond from "./diamond.svg";
import Emerald from "./emerald.svg";
import Onyx from "./onyx.svg";
import Sapphire from "./sapphire.svg";
import Citrine from "./citrine.svg";

type Props = {
  resourceType: SplendidResource;
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
    width={mini ? "1.25rem" : "2.5rem"}
  />
);

export default Resource;
