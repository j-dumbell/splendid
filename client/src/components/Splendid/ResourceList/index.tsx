import React from "react";

import { ResourceSize, splendidResource } from "../domain";
import ResourceCount from "./ResourceCount";

export type ResourceListProps = {
  resourceList: Record<string, number>;
  offsetsTemp?: Record<string, number>;
  offsetsPerm?: Record<string, number>;
  hideEmpty?: boolean;
  size?: ResourceSize;
  column?: boolean;
};

export const ResourceList = ({
  resourceList,
  offsetsPerm,
  offsetsTemp,
  hideEmpty,
  size,
  column,
}: ResourceListProps) => (
  <>
    {splendidResource.map((resource, i) => {
      const offsetPerm = offsetsPerm ? offsetsPerm[resource] : 0;
      const offsetTemp = offsetsTemp ? offsetsTemp[resource] : 0;
      const totals = (resourceList[resource] ?? 0) + offsetPerm + offsetTemp;
      if (totals <= 0 && hideEmpty) {
        return null;
      }
      return (
        <ResourceCount
          key={`resource-${i}`}
          resource={resource}
          count={resourceList[resource]}
          size={size}
          column={column}
          offsetPerm={offsetPerm}
          offsetTemp={offsetTemp}
        />
      );
    })}
  </>
);

export default ResourceList;
