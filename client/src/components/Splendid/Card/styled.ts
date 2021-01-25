import styled, { css } from "styled-components";

import FlexContainer from "../../common/FlexContainer";

type Props = {
  tier: number;
};

const tierColours: Record<string, string> = {
  1: "#A9DE4C",
  2: "#F4D83B",
  3: "#54BEFA",
};

const CardContainer = styled(FlexContainer)`
  margin: 5px;
  padding: 5px;
  width: 80px;
  height: 120px;
  border-radius: 5px;
  ${({ tier }: Props) => css`
    background-color: ${tierColours[tier]};
  `}
`;

export default CardContainer;
