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
