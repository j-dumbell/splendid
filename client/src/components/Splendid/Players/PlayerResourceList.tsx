import React from "react";

import { SplendidPlayer, splendidResource } from "../domain";
import { constructOffsetsPerm } from "./util";
import ResourceCount from "../ResourceList/ResourceCount";
import { PlayerResourceListContainer } from "./styled";

export const PlayerResourceList = ({
  bank: playerBank,
  purchased,
}: SplendidPlayer) => (
  <PlayerResourceListContainer>
    {splendidResource.map((resource, i) => (
      <ResourceCount
        key={i}
        resource={resource}
        count={playerBank[resource]}
        offsetPerm={constructOffsetsPerm(resource, purchased)}
      />
    ))}
  </PlayerResourceListContainer>
);

export default PlayerResourceList;
