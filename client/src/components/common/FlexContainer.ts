import styled, { css } from "styled-components";

type Props = {
  column?: boolean;
  reverse?: boolean;
  justify?: string;
  color?: string;
};

const FlexContainer = styled.div`
  display: flex;
  ${(props: Props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
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

export const FlexChild = styled(FlexContainer)`
  flex: 1;
`;

export default FlexContainer;
