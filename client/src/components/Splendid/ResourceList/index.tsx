import React from "react";

import { splendidResource, SplendidCard } from "../domain";
import { UnstyledButton } from "../../common/Button";
import ResourceCount from "./ResourceCount";

type Props = {
  resourceList: Record<string, number>;
  hideEmpty?: boolean;
  mini?: boolean;
  column?: boolean;
  purchased?: SplendidCard[];
};

const ResourceList = ({ resourceList, hideEmpty, mini, column }: Props) => (
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

export const PlayerResourceList = ({
  resourceList,
  hideEmpty,
  purchased,
}: Props) => (
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
        />
      );
    })}
  </>
);

export const BoardResourceList = ({
  resourceList,
  hideEmpty,
  purchased,
}: Props) => (
  <>
    {splendidResource.map((resource, i) => {
      const purchasedCount =
        purchased?.filter((card) => card.income === resource).length ?? 0;
      const totals = (resourceList[resource] ?? 0) + purchasedCount;
      if (totals <= 0 && hideEmpty) {
        return null;
      }
      return (
        <UnstyledButton>
          <ResourceCount
            key={`resource-${i}`}
            resource={resource}
            count={resourceList[resource]}
            purchasedCount={purchasedCount}
          />
        </UnstyledButton>
      );
    })}
  </>
);

export default ResourceList;
