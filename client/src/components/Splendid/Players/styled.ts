import styled from "styled-components";

import FlexContainer, { FlexChild, PaddedContainer } from "../../common/FlexContainer";

export const PlayersContainer = styled(PaddedContainer)`
  flex: 1;
`;

type Props = { isActive: boolean };
export const PlayerContainer = styled(FlexContainer)`
  padding: 10px;
  border-radius: 5px;
  border: ${({ isActive }: Props) => (isActive ? "solid 2px #9e9e9e" : "solid 1px #bdbfbf")};
  background: #98927c26;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const PlayerDeckContainer = styled(FlexChild)`
  padding-top: 10px;
`;

export const PlayerResourceFormContainer = styled(FlexContainer)`
  button {
    margin: 5px 0;
  }
`;
