import { Form } from "formik";
import styled from "styled-components";

import FlexContainer from "../common/FlexContainer";

export const SplendidContainer = styled(FlexContainer)`
  flex: 5;

  & > * {
    margin-left: 30px;
    border-left: solid 2px #494945;
  }
`;

export const SplendidFormContainer = styled(Form)`
  display: flex;
  flex: 5;

  & > * {
    margin-left: 30px;
    border-left: solid 2px #494945;
  }
`;