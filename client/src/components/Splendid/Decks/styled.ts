import styled from "styled-components";

export const DeckCardContainer = styled.label`
  display: block;
  position: relative;

  input[type="radio"] {
    display: none;
  }
`;

export const PurchaseContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 30px;
  left: 50%;
  transform: translate(-50%, -15px);
  width: 80%;
  visibility: ${({ selected }: { selected: boolean }) =>
    selected ? "visible" : "hidden"};

  button {
    margin-bottom: 5px;
    width: 100%;
  }
`;

export const DeckStack = styled.div`
  position: relative;
`;

export const StackCount = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;
