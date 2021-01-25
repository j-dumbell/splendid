import React from "react";

import Ruby from "../assets/ruby.svg";
import Diamond from "../assets/diamond.svg";
import Emerald from "../assets/emerald.svg";
import Onyx from "../assets/onyx.svg";
import Sapphire from "../assets/sapphire.svg";
import Citrine from "../assets/citrine.svg";

import { Resource } from "../domain";

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
