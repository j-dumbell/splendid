import styled, { css } from "styled-components";

type Props = {
  column?: boolean;
};

const ResourceContainer = styled.div`
  margin: 0 15px 0 0;
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
