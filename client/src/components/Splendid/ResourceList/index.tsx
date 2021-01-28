import React from "react";

import { splendidResource } from "../domain";
import Resource from "../Resource";

type Props = {
  resourceList: Record<string, number>;
  hideEmpty?: boolean;
  mini?: boolean;
};

const ResourceList = ({ resourceList, hideEmpty, mini }: Props) => {
  const resources = splendidResource.map((resourceType, i) => {
    if (hideEmpty && !resourceList[resourceType]) {
      return null;
    }
    return (
      <div key={`resource-${i}`}>
        <Resource resourceType={resourceType} mini={mini} />
        {resourceList[resourceType]}
      </div>
    );
  });
  return <>{resources}</>;
};

export default ResourceList;
