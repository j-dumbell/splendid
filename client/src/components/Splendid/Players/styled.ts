import styled from "styled-components";

import FlexContainer, { FlexChild } from "../../common/FlexContainer";

export const PlayersContainer = styled(FlexContainer)`
`;

type Props = { isActive: boolean };
export const PlayerContainer = styled(FlexContainer)`
  padding: 10px;
  border: ${({ isActive }: Props) => (isActive ? "solid 2px white" : "none")}
`;

export const PlayerDeckContainer = styled(FlexChild)`
  padding-top: 10px;
`;

export const PlayerResourceFormContainer = styled(FlexContainer)`
  button {
    margin: 5px 0;
  }
`;
