import React from "react";

import { ResourceListProps } from ".";
import { splendidResource } from "../domain";
import ResourceCount from "./ResourceCount";

const BaseResourceList = ({
  resourceList,
  hideEmpty,
  mini,
  column,
}: ResourceListProps) => (
  <>
    {splendidResource.map((resource, i) => {
      if ((resourceList[resource] ?? 0) <= 0 && hideEmpty) {
        return null;
      }
      return (
        <ResourceCount
          key={`resource-${i}`}
          resource={resource}
          count={resourceList[resource]}
          mini={mini}
          column={column}
        />
      );
    })}
  </>
);

export default BaseResourceList;
