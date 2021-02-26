import styled from "styled-components";

export const UnstyledButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  text-align: left;
  color: inherit;
`;

export const Button = styled(UnstyledButton)`
  border: solid 2px #0023c4;
`;
