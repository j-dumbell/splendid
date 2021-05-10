import styled from "styled-components";

import FlexContainer, { FlexChild } from "../../common/FlexContainer";

export const PlayersContainer = styled(FlexContainer)`
  flex: 1;
  max-width: 30rem;
  padding-right: 30px;
`;

type Props = { isActivePlayer?: boolean; isActiveClient: boolean };
export const PlayerContainer = styled(FlexContainer)`
  padding: 10px;
  outline: none;
  border-radius: 5px;
  border: solid 1px black;
  margin-bottom: 10px;
  background: #e0e0e0;

  ${({ isActiveClient }: Props) =>
    !isActiveClient &&
    `
    & > *:last-child {
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      transition: opacity 0.2s ease-in-out, max-height 0.2s ease-in-out;
    }
    &:hover > *:last-child,
    &:focus > *:last-child,
    & > *:last-child:focus-within {
      max-height: 1000px;
      opacity: 1;
    }
    `}

  ${({ isActivePlayer }: Props) =>
    isActivePlayer &&
    `
    margin-top: 5px;
    box-shadow: 5px 5px 0px 0px rgba(0,0,0,0.3);
    transform: translate(-5px, -5px);
  `}

  &:last-child {
    margin-bottom: 0;
  }
`;

export const PlayerContents = styled(FlexContainer)``;

export const PlayerTitle = styled(FlexContainer)`
  margin-bottom: 10px;
`;

export const PlayerDeckContainer = styled(FlexChild)`
  overflow-x: scroll;
`;

export const PurchasedCardStack = styled(FlexContainer)`
  & > * {
    margin-right: -50px;

    &:hover,
    &:focus {
      z-index: 200;
      transform: translate(-5px, -5px);
      box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 0.2);
    }
  }

  margin-right: 55px;
`;

/**
 * @deprecated 
 * to be replaced with a new actions form 
 */
export const PlayerResourceFormContainer = styled(FlexContainer)`
  padding: 5px 0;
`;

export const PlayerResourceListContainer = styled(FlexContainer)`
  padding: 5px 0;
`;
