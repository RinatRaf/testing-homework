describe('Корзина', () => {
    it('Сохраняет содержимое корзины между перезагрузками', async ({browser}) => {
        await browser.url('http://localhost:3000/hw/store/catalog/0');
        await browser.$('.ProductDetails-AddToCart').click();

        await browser.url('http://localhost:3000/hw/store/cart');
        await browser.url('http://localhost:3000/hw/store/cart');
        const Form = await browser.$('.Form');
        await Form.waitForExist()
        
        expect(Form).toExist()
    })
})