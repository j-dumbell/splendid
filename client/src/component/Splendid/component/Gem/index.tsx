import React from "react";

import Ruby from "./ruby.svg";
import Diamond from "./diamond.svg";
import Emerald from "./emerald.svg";
import Onyx from "./onyx.svg";
import Sapphire from "./sapphire.svg";
import Citrine from "./citrine.svg";

import { Resource } from "../../domain";

type Props = {
  colour: Resource;
  mini?: boolean;
};

const Gem = ({ colour, mini }: Props) => {
  const assetMap = {
    black: Onyx,
    white: Diamond,
    red: Ruby,
    blue: Sapphire,
    green: Emerald,
    yellow: Citrine,
  };
  return (
    <img
      src={assetMap[colour]}
      alt={`${colour} gem`}
      style={{ width: mini ? "20px" : "50px" }}
    />
  );
};

export default Gem;
