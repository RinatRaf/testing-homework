import React from "react";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { initStore } from "../../src/client/store";
import { CartApi, ExampleApi } from "../../src/client/api";

const basename = "/hw/store";

const app = (component: ReactNode, initialEntries?: any) => {
  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
    </Provider>
  );
};

export { app };
