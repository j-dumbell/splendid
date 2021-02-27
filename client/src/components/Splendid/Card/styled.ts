import styled from "styled-components";

import FlexContainer from "../../common/FlexContainer";
import { CardSize } from "../domain";

type Props = {
  tier: number;
  size?: CardSize;
  reserved?: boolean;
  shadowed?: boolean;
};

const tierColours: Record<string, string> = {
  1: "189, 234, 80",
  2: "255, 167, 77",
  3: "84, 235, 250",
};

const widthMap = {
  mini: "5rem",
  micro: "4rem",
  default: "6rem",
};

const heightMap = {
  mini: "7.5rem",
  micro: "6rem",
  default: "9rem",
};

export const CardContainer = styled(FlexContainer)`
  margin: 5px;
  padding: 5px;
  width: ${({ size }: Props) => size ? widthMap[size] : widthMap.default};
  height: ${({ size }: Props) => size ? heightMap[size] : heightMap.default};
  border-radius: 5px;
  background-color: ${({ tier, reserved }: Props) =>
    `rgb(${tierColours[tier]}, ${reserved ? 0.5 : 1})`};
  ${({ shadowed }: Props) =>
    shadowed &&
    `
    box-shadow: 5px 5px 0px 0px rgba(0,0,0,0.25);
  `};
`;
