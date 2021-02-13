import { Form } from "formik";
import styled from "styled-components";

export const SplendidContainer = styled(Form)`
  display: flex;
  flex: 3;

  & > * {
    padding: 0 30px;
    border-left: solid 2px #494945;
  }
`;
