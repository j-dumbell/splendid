import React from "react";
import styled from "styled-components";

import { splendidResource, SplendidResourceList } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import ResourceCount from "../ResourceList/ResourceCount";

const BankContainer = styled(FlexContainer)`
  margin-bottom: 20px;
`;

const Bank = ({
  bank,
  bankOffsetTemp,
}: {
  bank: SplendidResourceList;
  bankOffsetTemp?: SplendidResourceList;
}) => (
  <BankContainer justify="center">
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
