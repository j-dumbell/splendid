import React from "react";

import { ResourceSize, SplendidResource } from "../domain";
import Resource from "../Resource";
import ResourceContainer from "./styled";

type Props = {
  resource: SplendidResource;
  offsetTemp?: number;
  offsetPerm?: number;
  count: number;
  size?: ResourceSize;
  column?: boolean;
};

const ResourceCount = ({
  resource,
  offsetTemp,
  offsetPerm,
  count,
  size,
  column,
}: Props) => (
  <ResourceContainer column={column}>
    <Resource resourceType={resource} size={size} />
    <p>
      {offsetTemp ? (
        <span style={{ color: "red" }}>{count + offsetTemp}</span>
      ) : (
        <span>{count}</span>
      )}
      {offsetPerm
        ? offsetPerm < 0
          ? `(${offsetPerm})`
          : `(+${offsetPerm})`
        : null}
    </p>
  </ResourceContainer>
);

export default ResourceCount;
