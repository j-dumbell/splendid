import styled from "styled-components";

import FlexContainer from "../../common/FlexContainer";

type Props = {
  mini?: boolean;
};

const EliteContainer = styled(FlexContainer)`
  background-color: #bc8eed;
  margin: 5px;
  padding: 5px;
  width: ${({ mini }: Props) => (mini ? "5rem" : "6rem")};
  height: ${({ mini }: Props) => (mini ? "5rem" : "6rem")};
  border-radius: 5px;
`;

export default EliteContainer;
