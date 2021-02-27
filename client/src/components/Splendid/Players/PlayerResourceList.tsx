import React from "react";

import { SplendidPlayer, splendidResource } from "../domain";
import { constructOffsetsPerm } from "./helpers";
import FlexContainer from "../../common/FlexContainer";
import ResourceCount from "../ResourceList/ResourceCount";

export const PlayerResourceList = ({
  bank: playerBank,
  purchased,
}: SplendidPlayer) => (
  <FlexContainer>
    {splendidResource.map((resource, i) => (
      <ResourceCount
        key={i}
        resource={resource}
        count={playerBank[resource]}
        offsetPerm={constructOffsetsPerm(resource, purchased)}
      />
    ))}
  </FlexContainer>
);

export default PlayerResourceList;
