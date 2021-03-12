import styled, { css } from "styled-components";
import { SplendidSize } from "../domain";

type Props = {
  size: SplendidSize;
  column?: boolean;
};

const ResourceContainer = styled.div`
  margin: ${({ size }: Props) => (size === "default" ? "0 5px" : "0")};
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
