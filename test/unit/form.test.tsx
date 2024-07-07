import React from "react";
import { Cart } from "../../src/client/pages/Cart";
import { CartState, CheckoutResponse } from "../../src/common/types";
import userEvent from "@testing-library/user-event";
import { waitFor, screen, getByText } from "@testing-library/react";
import { app } from "./app";
import { CartApi } from "../../src/client/api";
import axios from "axios";

const cart: CartState = {
  1: { name: "Когтеточка 1", count: 1, price: 1 },
  2: { name: "Когтеточка 2", count: 2, price: 2 },
  3: { name: "Когтеточка 3", count: 1, price: 3 },
  4: { name: "Когтеточка 4", count: 1, price: 3 },
  5: { name: "Когтеточка 5", count: 1, price: 3 },
};

describe("Форма оформления заказа", () => {
  beforeAll(() => {
    jest.spyOn(CartApi.prototype, "getState").mockReturnValue(cart);
    jest.spyOn(axios, "post").mockResolvedValue({
      data: {
        id: 1,
      },
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Отображается при наличии товара в корзине", async () => {
    const { container } = app(<Cart />);

    const cartBody = await waitFor(() => container.querySelector(".Form"));

    expect(cartBody).toBeInTheDocument();
  });
  it("В случае невалидных данных появляется ошибка", async () => {
    const { getByRole, findByText } = app(<Cart />);

    const sendButton = await findByText("Checkout");
    await userEvent.click(sendButton);

    const name = getByRole("textbox", { name: "Name" });
    const phone = getByRole("textbox", { name: "Phone" });
    const address = getByRole("textbox", { name: "Address" });

    expect(name.getAttribute("class")).toContain("is-invalid");
    expect(phone.getAttribute("class")).toContain("is-invalid");
    expect(address.getAttribute("class")).toContain("is-invalid");
  });
  it("В случае ввалидного ввода телефона не появляется ошибка", async () => {
    const { container, findByText } = app(<Cart />);

    const inputPhone = await waitFor(() =>
      container.querySelector("input#f-phone")
    );
    await userEvent.type(inputPhone, "(123)-456-7890");
    const submitBtn = await findByText("Checkout");
    await userEvent.click(submitBtn);

    expect(inputPhone.getAttribute("class")).not.toContain("is-invalid");
  });
});
