import React from "react";

import { SplendidResource } from "../domain";
import Resource from "../Resource";
import ResourceContainer from "./styled";

type Props = {
  resource: SplendidResource;
  offset?: number;
  count: number;
  mini?: boolean;
  column?: boolean;
};

const ResourceCount = ({ resource, offset, count, mini, column }: Props) => (
  <ResourceContainer column={column}>
    <Resource resourceType={resource} mini={mini} />
    <p>
      {count}
      {offset ? (offset < 0 ? `(${offset})` : `(+${offset})`) : null}
    </p>
  </ResourceContainer>
);

export default ResourceCount;
