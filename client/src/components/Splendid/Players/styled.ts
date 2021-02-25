import styled from "styled-components";

import FlexContainer, { FlexChild, PaddedContainer } from "../../common/FlexContainer";

export const PlayersContainer = styled(PaddedContainer)`
  flex: 1;
  background: #98927c26;
`;

type Props = { isActive: boolean };
export const PlayerContainer = styled(FlexContainer)`
  padding: 10px;
  border: ${({ isActive }: Props) => (isActive ? "solid 2px #494945" : "none")}
`;

export const PlayerDeckContainer = styled(FlexChild)`
  padding-top: 10px;
`;

export const PlayerResourceFormContainer = styled(FlexContainer)`
  button {
    margin: 5px 0;
  }
`;
