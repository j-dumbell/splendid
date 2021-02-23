import React from "react";

import { SplendidElite } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Elite from "./Elite";

type Props = {
  elites: SplendidElite[];
  mini?: boolean;
};

const Elites = ({ elites, mini }: Props) => (
  <FlexContainer>
    {elites
      .filter((card) => card.id)
      .map((elite, i) => (
        <Elite key={`elite-${i}`} mini={mini} {...elite} />
      ))}
  </FlexContainer>
);

export default Elites;
