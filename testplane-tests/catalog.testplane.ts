
const URL_PATH:string = "http://localhost:3000/hw/store/catalog";


describe("Каталог", async () => {
    it("Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре", async ({ browser }) => {
        await browser.url(URL_PATH);
        
        const name = await browser.$(".ProductItem-Name").getText();
        const price = await browser.$(".ProductItem-Price").getText();
        const link = await browser.$(".ProductItem-DetailsLink").getText();
        expect(name).not.toEqual('');
        expect(price).not.toEqual("");
        expect(link).not.toEqual("");
    });
    it("Кнопка добавления в корзину отображается корректно", async ({ browser }) => {
        await browser.url(`${URL_PATH}/1`);

        await expect(browser.$(".ProductDetails-AddToCart")).toBeDisplayed();
    });
});
