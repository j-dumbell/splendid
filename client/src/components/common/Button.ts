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
  outline: none;

  &:disabled {
    background: inherit;
  }

  &:active, &focus {
    border-color: red;
  }

  &:hover, 
  &:focus {
    box-shadow: 2px 2px 0px 0px rgba(0,0,0,0.3);
    transform: translate(-2px, -2px);
  }
`;
