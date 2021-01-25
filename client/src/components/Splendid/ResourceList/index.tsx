import React from "react";

import Resource, { ResourceType } from "../Resource";

type Props = {
  resourceList: Record<string, number>;
  hideEmpty?: boolean;
  mini?: boolean;
};

const ResourceList = ({ resourceList, hideEmpty, mini }: Props) => {
  const keys: ResourceType[] = ["black", "white", "red", "blue", "green", "yellow"];
  const resources = keys.map((key) =>
    hideEmpty && !resourceList[key] ? null : (
      <div>
        <Resource resourceType={key} mini={mini} />
        {resourceList[key]}
      </div>
    )
  );
  return <>{resources}</>;
};

export default ResourceList;
