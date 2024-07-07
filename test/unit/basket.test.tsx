import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { app } from "./app";
import { Cart } from "../../src/client/pages/Cart";
import { CartApi } from "../../src/client/api";
import { CartState } from "../../src/common/types";
import { Application } from "../../src/client/Application";

const cart: CartState = {
  1: { name: "Когтеточка 1", count: 1, price: 1 },
  2: { name: "Когтеточка 2", count: 2, price: 2 },
  3: { name: "Когтеточка 3", count: 1, price: 3 },
  4: { name: "Когтеточка 4", count: 1, price: 3 },
  5: { name: "Когтеточка 5", count: 1, price: 3 },
};

const COUNT = 5;

describe("Корзина товаров", () => {
  describe("Пустая корзина", () => {
    it("Отображается ссылка на каталог товаров", async () => {
      const { findByRole } = app(<Cart />);

      const text = await screen.findByText(
        /Cart is empty. Please select products in the/
      );
      const link = await findByRole("link");

      expect(text).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/catalog");
    });
  });

  describe("Корзина с товарами", () => {
    beforeEach(() => {
      jest.spyOn(CartApi.prototype, "getState").mockReturnValue(cart);
    });
    it("Отображается таблица с добавленными в корзину товарами", async () => {
      const { container } = app(<Cart />);

      const cartBody = await waitFor(() =>
        container.querySelectorAll("tbody tr")
      );
      expect(cartBody).toHaveLength(COUNT);
    });
    it('Отображается кнопка "очистить корзину" и при нажатие очищает', async () => {
      const { findByText, container } = app(<Cart />);

      const clearButton = await findByText("Clear shopping cart");
      expect(clearButton).toBeInTheDocument();

      await userEvent.click(clearButton);

      expect(container.querySelectorAll("table")).toHaveLength(0);
    });
    it("Для каждого товара отображается название, цена, количество и стоимость", async () => {
      const { container } = app(<Cart />);

      const cartBody = await waitFor(() =>
        container.querySelectorAll("tbody tr")
      );

      cartBody.forEach((product, i) => {
        const productCart = cart[i + 1];
        const [name, price, count, total] = Array.from(
          product.querySelectorAll("td")
        ).map((td) => td.textContent);

        expect(name).toEqual(productCart.name);
        expect(price).toEqual("$" + productCart.price);
        expect(count).toEqual(String(productCart.count));
        expect(total).toEqual("$" + productCart.price * productCart.count);
      });
    });
    it("Отображается общая стоимость заказа", async () => {
      app(<Cart />);

      const price = screen.getByText("$14", { selector: "tfoot tr td" });
      expect(price).toBeInTheDocument();
    });
  });
});
