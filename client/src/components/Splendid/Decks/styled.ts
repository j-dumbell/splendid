import styled from "styled-components";

export const DeckCardContainer = styled.label`
  display: block;
  position: relative;

  input[type=radio] {
    display: none;
  }
`;

export const PurchaseContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%, -15px);
  width: 80%;
  visibility: ${({ selectedCard }: { selectedCard: boolean }) =>
    selectedCard ? "visible" : "hidden"};

  button {
    margin-bottom: 5px;
    width: 100%;
  }
`;
