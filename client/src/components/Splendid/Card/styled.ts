import styled from "styled-components";

import FlexContainer from "../../common/FlexContainer";

type Props = {
  tier: number;
  mini?: boolean;
  reserved?: boolean;
  shadowed?: boolean;
};

const tierColours: Record<string, string> = {
  1: "168, 222, 74",
  2: "244, 216, 59",
  3: "84, 190, 250",
};

export const CardContainer = styled(FlexContainer)`
  margin: 5px;
  padding: 5px;
  width: ${({ mini }: Props) => (mini ? "5rem" : "6rem")};
  height: ${({ mini }: Props) => (mini ? "7.5rem" : "9rem")};
  border-radius: 5px;
  background-color: ${({ tier, reserved }: Props) =>
    `rgb(${tierColours[tier]}, ${reserved ? 0.5 : 1})`};
  ${({ shadowed }: Props) =>
    shadowed && `
    box-shadow: 5px 5px 0px 0px rgba(0,0,0,0.25);
  `};
`;
