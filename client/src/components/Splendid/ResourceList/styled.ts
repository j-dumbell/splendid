import styled, { css } from "styled-components";
import { ResourceSize } from "../domain";

type Props = {
  size?: ResourceSize;
  column?: boolean;
};

const ResourceContainer = styled.div`
  margin: ${({ size }: Props) => (size === "mini" ? "0" : "0 5px")};
  &:last-child {
    margin: 0;
  }
  p {
    margin: 0;
    text-align: center;
    ${(props: Props) =>
      props.column &&
      css`
        display: inline-block;
      `}
  }
`;

export default ResourceContainer;
