import styled from "styled-components";

import FlexContainer, {
  FlexChild,
  PaddedContainer,
} from "../../common/FlexContainer";

export const PlayersContainer = styled(PaddedContainer)`
  flex: 1;
  max-width: 30rem;
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
  padding-top: 10px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #a3aaff;
    border: solid 1px black;
  }
`;

export const PlayerResourceFormContainer = styled(FlexContainer)``;
