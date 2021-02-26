import styled from "styled-components";

export const UnstyledButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  color: inherit;
  font-family: inherit;
`;

export const Button = styled(UnstyledButton)`
  display: block;
  border: solid 1px black;
  border-radius: 3px;
  padding: 1px 0.3rem;
  margin: 5px 1px 0;
  background: #f1f1f1;
`;
