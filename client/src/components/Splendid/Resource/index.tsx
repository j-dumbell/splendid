import React from "react";

import { ResourceSize, SplendidResource } from "../domain";
import Image from "../../common/Image";

import Apple from "./fruit/apple.svg";
import Strawberry from "./fruit/strawberry.svg";
import Pear from "./fruit/pear.svg";
import Peach from "./fruit/peach.svg";
import Orange from "./fruit/orange.svg";
import Pineapple from "./fruit/banana.svg";

const assetMap = {
  black: Peach,
  white: Orange,
  red: Strawberry,
  blue: Pear,
  green: Apple,
  yellow: Pineapple,
};

type Props = {
  resourceType: SplendidResource;
  size?: ResourceSize;
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
