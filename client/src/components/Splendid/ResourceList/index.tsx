import React from "react";

import { SplendidCard, splendidResource } from "../domain";
import ResourceCount from "./ResourceCount";

export type ResourceListProps = {
  resourceList: Record<string, number>;
  hideEmpty?: boolean;
  mini?: boolean;
  column?: boolean;
  purchased?: SplendidCard[];
};

export const ResourceList = ({
  resourceList,
  hideEmpty,
  mini,
  column,
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
          mini={mini}
          column={column}
          purchasedCount={purchasedCount}
        />
      );
    })}
  </>
);

export default ResourceList;
