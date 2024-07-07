import axios from "axios";
import React from "react";
import { ProductItem } from "../../src/client/components/ProductItem";
import { app } from "./app";
import { waitFor } from "@testing-library/react";
import { Catalog } from "../../src/client/pages/Catalog";
import { CartApi } from "../../src/client/api";

const serverData = {
  data: [
    { id: 1, name: "Когтеточка 1", price: 1 },
    { id: 2, name: "Когтеточка 2", price: 2 },
    { id: 3, name: "Когтеточка 3", price: 3 },
  ],
};

const cart = {
  1: { id: 2, name: "Когтеточка 2", price: 2, count: 1 },
};

describe("Каталог", () => {
  beforeEach(() => {
    jest.spyOn(axios, "get").mockResolvedValue(serverData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товару", () => {
    const product = serverData.data[0];
    const { getByText, getByRole } = app(<ProductItem product={product} />);
    const name = getByText(product.name);
    const price = getByText(`$${product.price}`);
    const link = getByRole("link");

    expect(name).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `/catalog/${product.id}`);
  });

  it("Отображаются все товары, которые вернул api", async () => {
    const { container } = app(<Catalog />);

    await waitFor(() => {
      expect(container.querySelectorAll(".ProductItem")).toHaveLength(3);
    });
  });

  it("Если товар уже добавлен в корзину, в каталоге отображается сообщение об этом", async () => {
    jest.spyOn(CartApi.prototype, "getState").mockReturnValue(cart);

    const { container } = app(<Catalog />);

    await waitFor(() => {
      expect(
        container.querySelector(".ProductItem .CartBadge")
      ).toBeInTheDocument();
    });
  });
});
