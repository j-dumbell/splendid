import styled from "styled-components";

import Stripes from './stripe.svg';
import FlexContainer from "../../common/FlexContainer";
import { CardSize } from "../domain";

type Props = {
  tier: number;
  size?: CardSize;
  reserved?: boolean;
  shadowed?: boolean;
};

const tierColours: Record<string, string> = {
  3: "142, 226, 191",
  2: "255, 219, 100",
  1: "249, 164, 147",
};

const widthMap = {
  mini: "5rem",
  micro: "4rem",
  default: "7.5rem",
};

const heightMap = {
  mini: "7.5rem",
  micro: "6rem",
  default: "11.25rem",
};

export const CardContainer = styled(FlexContainer)`
  flex-shrink: 0;
  margin: 5px;
  padding: 5px;
  width: ${({ size }: Props) => size ? widthMap[size] : widthMap.default};
  height: ${({ size }: Props) => size ? heightMap[size] : heightMap.default};
  border-radius: 5px;
  border: solid 1px black;
  background-color: ${({ tier, reserved }: Props) =>
    `rgb(${tierColours[tier]}, ${reserved ? 0.5 : 1})`};

  ${({ shadowed }: Props) =>
    shadowed &&
    `
    background-image: url(${Stripes});
    background-blend-mode: multiply;
    background-repeat: repeat;
    background-size: 10.5rem;
    box-shadow: 5px 5px 0px 0px rgba(0,0,0,0.3);
  `};
`;
