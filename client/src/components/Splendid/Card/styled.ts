import styled from "styled-components";

import FlexContainer from "../../common/FlexContainer";

type Props = {
  tier: number;
  mini?: boolean;
};

const tierColours: Record<string, string> = {
  1: "#A9DE4C",
  2: "#F4D83B",
  3: "#54BEFA",
};

export const CardInnerContainer = styled(FlexContainer)`
  margin: 5px;
  padding: 5px;
  width: ${({ mini }: Props) => (mini ? "5rem" : "6rem")};
  height: ${({ mini }: Props) => (mini ? "7.5rem" : "9rem")};
  border-radius: 5px;
  background-color: ${({ tier }: Props) => tierColours[tier]};
`;

export const PurchaseContainer = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  visibility: ${({ selectedCard }: { selectedCard: boolean }) =>
    selectedCard ? "visible" : "hidden"};

  button {
    margin-bottom: 5px;
    width: 100%;
  }
`;
