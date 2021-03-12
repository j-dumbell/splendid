import styled, { css } from "styled-components";

type Props = {
  color?: string;
};

const Text = styled.span`
  ${(props: Props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;

export default Text;
