import React from "react";

import { SplendidSize, SplendidResource } from "../domain";
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
  size?: SplendidSize;
};

const sizeMap = {
  micro: "1rem",
  mini: "1.5rem",
  big: "3rem",
  default: "2rem",
}

const Resource = ({ resourceType, size }: Props) => (
  <Image
    src={assetMap[resourceType]}
    alt={`${resourceType} resource`}
    width={size ? sizeMap[size] : sizeMap.default}
  />
);

export default Resource;
