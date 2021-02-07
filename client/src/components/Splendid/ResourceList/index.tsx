import React from "react";

import { splendidResource } from "../domain";
import ResourceCount from "./ResourceCount";

export type ResourceListProps = {
  resourceList: Record<string, number>;
  offsets?: Record<string, number>;
  hideEmpty?: boolean;
  mini?: boolean;
  column?: boolean;
};

export const ResourceList = ({
  resourceList,
  offsets,
  hideEmpty,
  mini,
  column,
}: ResourceListProps) => (
  <>
    {splendidResource.map((resource, i) => {
      const offset = offsets ? offsets[resource] : 0;
      const totals = (resourceList[resource] ?? 0) + offset;
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
          offset={offset}
        />
      );
    })}
  </>
);

export default ResourceList;
