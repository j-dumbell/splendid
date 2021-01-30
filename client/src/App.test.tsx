import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "./state/reducer";
import App from "./App";

const store = createStore(rootReducer);

it("renders the title", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = getByText(/Splendid/i);
  expect(linkElement).toBeInTheDocument();
});
