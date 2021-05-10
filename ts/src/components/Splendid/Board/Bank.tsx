import React from "react";
import styled from "styled-components";

import {
  splendidResource,
  SplendidResourceList,
} from "../domain";
import FlexContainer from "../../common/FlexContainer";
import ResourceCount from "../ResourceList/ResourceCount";
import { useGame } from "../../../hooks/useGame";

const BankContainer = styled(FlexContainer)`
  margin-bottom: 20px;
`;

type Props = { bank: SplendidResourceList };

const Bank = ({ bank }: Props) => {
  const [form] = useGame();
  return (
    <BankContainer justify="center">
      {splendidResource.map((resource, i) => (
        <ResourceCount
          key={i}
          size="big"
          resource={resource}
          count={bank[resource]}
          offsetTemp={-form.resources[resource]}
        />
      ))}
    </BankContainer>
  );
};

export default Bank;
