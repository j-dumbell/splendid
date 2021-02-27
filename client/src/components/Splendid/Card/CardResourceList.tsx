import React from "react";

import { SplendidSize, SplendidResourceList } from "../domain";
import ResourceList from "../ResourceList";

type Props = {
  cost?: SplendidResourceList;
  size?: SplendidSize;
  reserved?: boolean;
};

const CardResourceList = ({ cost, size, reserved }: Props) => {
  if (!cost || (size === "micro" && !reserved)) {
    return null;
  }
  return (
    <div>
      <ResourceList resourceList={cost} hideEmpty size={reserved ? "micro" : "mini"} column />
    </div>
  );
};

export default CardResourceList;
