import React from "react";

import FlexContainer from "../../common/FlexContainer";
import { splendidResource, SplendidResourceList } from "../domain";
import ResourceCount from "../ResourceList/ResourceCount";

const Bank = ({
  bank,
  bankOffsetTemp,
}: {
  bank: SplendidResourceList;
  bankOffsetTemp?: SplendidResourceList;
}) => (
  <FlexContainer color="white">
    {splendidResource.map((resource, i) => (
      <ResourceCount
        key={i}
        resource={resource}
        count={bank[resource]}
        offsetTemp={bankOffsetTemp ? bankOffsetTemp[resource] : undefined}
      />
    ))}
  </FlexContainer>
);

export default Bank;
