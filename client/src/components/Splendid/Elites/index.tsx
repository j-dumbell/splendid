import React from "react";

import { SplendidElite } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Elite from "./Elite";

const Elites = ({ elites }: { elites: SplendidElite[]} ) => (
  <FlexContainer>
    {elites
      .filter((card) => card.id)
      .map((elite, i) => (
        <Elite key={`elite-${i}`} {...elite} />
      ))}
  </FlexContainer>
);

export default Elites;
