import styled from "styled-components";

type Props = { shadowed?: boolean };

export const PurchaseContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  width: 80%;
  visibility: hidden;

  button {
    margin-bottom: 5px;
    width: 100%;
    transform: translate(-1px, 0);
  }
`;

export const PurchasableCardContainer = styled.label`
  display: block;
  outline: none;
  position: relative;
  input[type="radio"] {
    display: none;
  }

  &:hover,
  &:focus-within {
    transform: translate(-5px, -5px);

    & > div:last-child {
      box-shadow: ${({ shadowed }: Props) =>
          shadowed ? `10px 10px` : `5px 5px`}
        0px 0px rgba(0, 0, 0, 0.3);
    }
  }

  &:focus-within > ${PurchaseContainer} {
    visibility: visible;
  }
`;

export const DeckStack = styled.div`
  position: relative;
  ${({ shadowed }: { shadowed?: boolean }) =>
    shadowed && "transform: translate(-5px, -5px);"}
`;

export const StackCount = styled.div`
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 10px;
`;
