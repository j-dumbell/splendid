import styled from "styled-components";

import FlexContainer from "../../common/FlexContainer";

type Props = {
  tier: number;
  mini?: boolean;
};

const tierColours: Record<string, string> = {
  1: "#A9DE4C",
  2: "#F4D83B",
  3: "#54BEFA",
};

const CardContainer = styled(FlexContainer)`
  margin: 5px;
  padding: 5px;
  width: ${({ mini }: Props) => (mini ? "5rem" : "6rem")};
  height: ${({ mini }: Props) => (mini ? "7.5rem" : "9rem")};
  border-radius: 5px;
  background-color: ${({ tier }: Props) => tierColours[tier]};
`;

export default CardContainer;
