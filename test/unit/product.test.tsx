import React from "react";
import { app } from "./app";
import userEvent from "@testing-library/user-event";
import { Product } from "../../src/common/types";
import { ProductDetails } from "../../src/client/components/ProductDetails";

const product: Product = {
  id: 1,
  name: "когтеточка",
  description: "лучшая когтеточка",
  price: 123,
  color: "red",
  material: "Concrete",
};

describe("Товар", () => {
  it('Отображается название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', () => {
    const { getByText } = app(<ProductDetails product={product} />);

    const name = getByText(product.name);
    const description = getByText(product.description);
    const price = getByText(`$${product.price}`);
    const color = getByText(product.color);
    const material = getByText(product.material);
    const addBtn = getByText("Add to Cart");

    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(color).toBeInTheDocument();
    expect(material).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();
  });

  it("Если товар добавлен в корзину, на странице товара отображается сообщение об этом", async () => {
    const info = app(<ProductDetails product={product} />);

    const addBtn = info.getByText("Add to Cart");
    await userEvent.click(addBtn);
    const notice = await info.findByText("Item in cart");

    expect(notice).toBeInTheDocument();
  });
});
