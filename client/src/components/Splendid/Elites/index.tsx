import React from "react";

import { SplendidElite } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Elite from "./Elite";

type Props = {
  elites: SplendidElite[];
  justify?: string;
  mini?: boolean;
};

const Elites = ({ elites, justify, mini }: Props) => (
  <FlexContainer justify={justify}>
    {elites
      .filter((card) => card.id)
      .map((elite, i) => (
        <Elite key={`elite-${i}`} mini={mini} {...elite} />
      ))}
  </FlexContainer>
);

export default Elites;
