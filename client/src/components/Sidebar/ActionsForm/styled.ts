import styled from "styled-components";

import FlexContainer from "../../common/FlexContainer";

export const ActionsFormContainer = styled(FlexContainer)`
  & > button,
  form > button,
  form > input[type="text"] {
    font-family: monospace;
    margin: 0 0 5px;
  }
`;
