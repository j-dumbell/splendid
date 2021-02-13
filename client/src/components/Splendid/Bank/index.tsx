import React from "react";

import { splendidResource, SplendidResourceList } from "../domain";
import { BankContainer } from './styled';
import ResourceCount from "../ResourceList/ResourceCount";

const Bank = ({
  bank,
  bankOffsetTemp,
}: {
  bank: SplendidResourceList;
  bankOffsetTemp?: SplendidResourceList;
}) => (
  <BankContainer color="white" justify="center">
    {splendidResource.map((resource, i) => (
      <ResourceCount
        key={i}
        resource={resource}
        count={bank[resource]}
        offsetTemp={bankOffsetTemp ? bankOffsetTemp[resource] : undefined}
      />
    ))}
  </BankContainer>
);

export default Bank;
