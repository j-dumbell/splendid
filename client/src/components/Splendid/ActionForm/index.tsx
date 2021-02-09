import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import TakeResourceForm from "./TakeResourceForm";
import CardActionForm from "./CardActionForm";
import FlexContainer from "../../common/FlexContainer";
import { Formik, Form, Field } from "formik";

const ActionForm = () => {
  const game = useSelector(({ game }: State) => game);
  if (!game) {
    return null;
  }
  return (
    <FlexContainer column>
      <Formik onSubmit={() => {}} initialValues={{ action: "" }}>
        <Form>
          <FlexContainer column>
            <label>
              <Field type="radio" name="gameAction" value="takeResource" />
              Take Resource
            </label>
            <label>
              <Field type="radio" name="gameAction" value="buyCard" />
              Buy Card
            </label>
            <label>
              <Field type="radio" name="gameAction" value="reserveCard" />
              Reserve Card
            </label>
          </FlexContainer>
        </Form>
      </Formik>
      <FlexContainer>
        <TakeResourceForm resourceList={game.board.bank} />
      </FlexContainer>
      <CardActionForm {...game} />
    </FlexContainer>
  );
};

export default ActionForm;
