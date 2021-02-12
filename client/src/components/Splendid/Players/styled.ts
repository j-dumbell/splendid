import styled from "styled-components";

import FlexContainer from "../../common/FlexContainer";

export const PlayersContainer = styled.div`
  margin-left: 50px;
`;

type Props = { isActive: boolean };
export const PlayerContainer = styled(FlexContainer)`
  padding: 10px;
  border: ${({ isActive }: Props) => (isActive ? "solid 2px white" : "none")}
`;

export const PlayerDeckContainer = styled(FlexContainer)`
  padding-top: 10px;
`;

export const PlayerResourceFormContainer = styled(FlexContainer)`
  button {
    margin: 5px 0;
  }
`;
