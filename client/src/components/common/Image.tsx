import styled, { css } from "styled-components";

type Props = {
  width?: string;
};

const Image = styled.img`
  ${(props: Props) =>
    props.width &&
    css`
      width: ${props.width};
    `}
`;

export default Image;
