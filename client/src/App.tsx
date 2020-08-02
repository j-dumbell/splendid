import React from "react";
import JSONPretty from "react-json-pretty";
import { Formik } from "formik";

import "./App.css";

import { useWebSocket } from "./hooks/websocket";

function App() {
  const [loading, error, data, send] = useWebSocket("/");
  return (
    <>
      <h1>Splendid</h1>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, { setSubmitting }) => {
          send({ message: "new game", name: values.name })
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {touched.name && errors.name}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <JSONPretty
        data={{ loading, error, data }}
        theme={{
          main: "color:#66d9ef;",
          key: "color:#f92672;",
          string: "color:#fd971f;",
          value: "color:#a6e22e;",
          boolean: "color:#ac81fe;",
        }}
      />
    </>
  );
}

export default App;
