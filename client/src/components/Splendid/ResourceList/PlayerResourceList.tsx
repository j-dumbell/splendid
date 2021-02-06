import React from "react";

import { ResourceListProps } from ".";
import { splendidResource } from "../domain";
import ResourceCount from "./ResourceCount";

export const PlayerResourceList = ({
  resourceList,
  hideEmpty,
  purchased,
}: ResourceListProps) => (
  <>
    {splendidResource.map((resource, i) => {
      const purchasedCount =
        purchased?.filter((card) => card.income === resource).length ?? 0;
      const totals = (resourceList[resource] ?? 0) + purchasedCount;
      if (totals <= 0 && hideEmpty) {
        return null;
      }
      return (
        <ResourceCount
          key={`resource-${i}`}
          resource={resource}
          count={resourceList[resource]}
          purchasedCount={purchasedCount}
        />
      );
    })}
  </>
);

export default PlayerResourceList;
