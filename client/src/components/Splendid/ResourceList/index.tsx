import React from "react";

import { splendidResource, SplendidCard } from "../domain";
import ResourceCount from "./ResourceCount";

type Props = {
  resourceList: Record<string, number>;
  hideEmpty?: boolean;
  mini?: boolean;
  column?: boolean;
  purchased?: SplendidCard[];
};

const ResourceList = ({ resourceList, hideEmpty, mini, purchased, column }: Props) => (
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
          mini={mini}
          column={column}
        />
      );
    })}
  </>
);

export default ResourceList;
