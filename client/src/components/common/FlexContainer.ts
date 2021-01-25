import styled, { css } from "styled-components";

type Props = {
  column?: boolean;
  justify?: string;
};

const FlexContainer = styled.div`
  display: flex;
  ${(props: Props) =>
    props.column &&
    css`
      flex-direction: column;
    `}
  ${(props: Props) =>
    props.justify &&
    css`
      justify-content: ${props.justify};
    `}
`;

export default FlexContainer;
