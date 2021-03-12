import React from "react";
import styled from "styled-components";
import { useFormikContext } from "formik";

import {
  SplendidForm,
  splendidResource,
  SplendidResourceList,
} from "../domain";
import FlexContainer from "../../common/FlexContainer";
import ResourceCount from "../ResourceList/ResourceCount";

const BankContainer = styled(FlexContainer)`
  margin-bottom: 20px;
`;

type Props = { bank: SplendidResourceList };

const Bank = ({ bank }: Props) => {
  const { values } = useFormikContext<SplendidForm>();
  return (
    <BankContainer justify="center">
      {splendidResource.map((resource, i) => (
        <ResourceCount
          key={i}
          size="big"
          resource={resource}
          count={bank[resource]}
          offsetTemp={-values.resources[resource]}
        />
      ))}
    </BankContainer>
  );
};

export default Bank;
