import React from "react";

import { splendidResource } from "../domain";
import ResourceCount from "./ResourceCount";

export type ResourceListProps = {
  resourceList: Record<string, number>;
  offsetsTemp?: Record<string, number>;
  offsetsPerm?: Record<string, number>;
  hideEmpty?: boolean;
  mini?: boolean;
  column?: boolean;
};

export const ResourceList = ({
  resourceList,
  offsetsPerm,
  offsetsTemp,
  hideEmpty,
  mini,
  column,
}: ResourceListProps) => (
  <>
    {splendidResource.map((resource, i) => {
      const offsetPerm = offsetsPerm ? offsetsPerm[resource] : 0;
      const totals = (resourceList[resource] ?? 0) + offsetPerm;
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
          offsetPerm={offsetPerm}
        />
      );
    })}
  </>
);

export default ResourceList;
