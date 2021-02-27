import styled from "styled-components";

import Stripes from "./stripe.svg";
import FlexContainer from "../../common/FlexContainer";
import { SplendidSize } from "../domain";

type Props = {
  tier: number;
  size?: SplendidSize;
  reserved?: boolean;
  flipped?: boolean;
  index?: number;
};

const tierColours: Record<string, string> = {
  3: "142, 226, 191",
  2: "255, 219, 100",
  1: "249, 164, 147",
};

export const widthMap = {
  micro: "4rem",
  mini: "5rem",
  big: "7.5rem",
  default: "7.5rem",
};

const heightMap = {
  micro: "6rem",
  mini: "7.5rem",
  big: "11.25rem",
  default: "11.25rem",
};

export const CardContainer = styled(FlexContainer)`
  flex-shrink: 0;
  outline: none;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  border: solid 1px black;
  width: ${({ size }: Props) => (size ? widthMap[size] : widthMap.default)};
  height: ${({ size }: Props) => (size ? heightMap[size] : heightMap.default)};

  background-blend-mode: multiply;
  background-repeat: repeat;
  background-color: ${({ tier }: Props) => `rgb(${tierColours[tier]})`};
  ${({ flipped, reserved }: Props) =>
    flipped &&
    `
    background-image: url(${Stripes});
    background-size: ${reserved ? `8rem` : `10.5rem`};
    ${!reserved && `box-shadow: 5px 5px 0px 0px rgba(0,0,0,0.3);`}
  `};

  ${({ index }) => index && `z-index: ${100 - index};`}
`;

export const CardVictoryPoints = styled.div`
  font-size: ${({ size }: Pick<Props, "size">) =>
    size !== "micro" ? "1.6rem" : "0.8rem"};
`;
