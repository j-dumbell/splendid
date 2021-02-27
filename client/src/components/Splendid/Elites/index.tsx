import React from "react";

import { SplendidElite, SplendidSize } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Elite from "./Elite";

type Props = {
  elites: SplendidElite[];
  size?: SplendidSize;
};

const Elites = ({ elites, size }: Props) => (
  <FlexContainer>
    {elites
      .filter((card) => card.id)
      .map((elite, i) => (
        <Elite key={`elite-${i}`} size={size} {...elite} />
      ))}
  </FlexContainer>
);

export default Elites;
