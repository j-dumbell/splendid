import styled from "styled-components";

import FlexContainer from "../../common/FlexContainer";

type Props = {
  mini?: boolean;
};

const EliteContainer = styled(FlexContainer)`
  border: solid 1px black;
  background-color: #a3aaff;
  margin: 5px;
  padding: 5px;
  width: ${({ mini }: Props) => (mini ? "5rem" : "7.5rem")};
  height: ${({ mini }: Props) => (mini ? "5rem" : "7.5rem")};
  border-radius: 5px;
`;

export default EliteContainer;
