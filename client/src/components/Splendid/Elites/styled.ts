import styled from "styled-components";

import FlexContainer from "../../common/FlexContainer";
import { widthMap } from '../Card/styled';
import { SplendidSize } from "../domain";

type Props = {
  size?: SplendidSize;
};

const EliteContainer = styled(FlexContainer)`
  border: solid 1px black;
  background-color: #a3aaff;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;

  ${({ size }: Props) => {
    const value = size ? widthMap[size] : widthMap.default;
    return `height: ${value}; width: ${value}`;
  }}
`;

export default EliteContainer;
