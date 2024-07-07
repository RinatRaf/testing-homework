import React from "react";
import { Application } from "../../src/client/Application";
import { waitFor } from "@testing-library/react";
import { app } from "./app";

describe("Ссылки", () => {
  it("В шапке отображаются ссылки на страницы магазина", async () => {
    const { container } = app(<Application />);
    const catalog = container.querySelector("[href='/catalog']");
    const delivery = container.querySelector("[href='/delivery']");
    const contacts = container.querySelector("[href='/contacts']");
    const cart = container.querySelector("[href='/cart']");

    waitFor(() => {
      expect(catalog).toBeInTheDocument();
      expect(delivery).toBeInTheDocument();
      expect(contacts).toBeInTheDocument();
      expect(cart).toBeInTheDocument();
    });
  });

  it("Название магазина в шапке является ссылкой на главную страницу", async () => {
    const { container } = app(<Application />);

    waitFor(() => {
      expect(container.querySelector('[href="/"]')).toBeInTheDocument();
    });
  });
});

describe("Статические страницы", () => {
  it("Главная страница статическая", () => {
    const { container } = app(<Application />, ["/"]);

    expect(container).toMatchSnapshot("Главная страница");
  });
  it("Страница условий доставки статическая", () => {
    const { container } = app(<Application />, ["/delivery"]);

    expect(container).toMatchSnapshot("Страница условий доставки");
  });
  it("Страница контактов статическая", () => {
    const { container } = app(<Application />, ["/contacts"]);

    expect(container).toMatchSnapshot("Страница контактов");
  });
});
