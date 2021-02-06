import React from "react";

import { SplendidResource } from "../domain";
import Resource from "../Resource";
import ResourceContainer from "./styled";

type Props = {
  resource: SplendidResource;
  count: number;
  purchasedCount?: number;
  mini?: boolean;
  column?: boolean;
};

const ResourceCount = ({ resource, count, purchasedCount, mini, column }: Props) => (
  <ResourceContainer column={column}>
    <Resource resourceType={resource} mini={mini} />
    <p>
      {count}
      {(purchasedCount ?? 0) > 0 && `(+${purchasedCount})`}
    </p>
  </ResourceContainer>
);

export default ResourceCount;
