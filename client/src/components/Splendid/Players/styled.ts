import styled from "styled-components";

import FlexContainer, {
  FlexChild,
} from "../../common/FlexContainer";

export const PlayersContainer = styled(FlexContainer)`
  flex: 1;
  max-width: 30rem;
  padding-right: 30px;
`;

type Props = { isActive: boolean };
export const PlayerContainer = styled(FlexContainer)`
  padding: 10px;
  border-radius: 5px;
  border: solid 1px black;
  margin-bottom: 10px;
  background: #e0e0e0;

  ${({ isActive }: Props) =>
    isActive &&
    `
    margin-top: 5px;
    box-shadow: 5px 5px 0px 0px rgba(0,0,0,0.3);
    transform: translate(-5px, -5px);
  `}

  &:last-child {
    margin-bottom: 0;
  }
`;

export const PlayerTitle = styled(FlexContainer)`
  margin-bottom: 10px;
`;

export const PlayerDeckContainer = styled(FlexChild)`
  overflow-x: scroll;
`;

export const PlayerResourceFormContainer = styled(FlexContainer)`
  padding: 10px 0;
`;

export const PlayerResourceListContainer = styled(FlexContainer)`
  padding: 10px 0;
`;