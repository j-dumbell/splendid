import styled, { css } from "styled-components";
import { Field, Form } from "formik";

type Props = {
  column?: boolean;
  reverse?: boolean;
  justify?: string;
  color?: string;
};

const FlexContainer = styled.div`
  display: flex;
  ${(props: Props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
  ${(props: Props) =>
    props.column &&
    css`
      flex-direction: column;
    `}
  ${(props: Props) =>
    props.justify &&
    css`
      justify-content: ${props.justify};
    `}
`;

export const FlexChild = styled(FlexContainer)`
  flex: 1;
`;

export const LeftPaddedContainer = styled(FlexContainer)`
  padding-left: 30px;
`;

export const FlexForm = styled(Form)`
  display: flex;
`;

export const FlexField = styled(Field)`
  flex: 1;
`;

export default FlexContainer;
