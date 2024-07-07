describe("Гамбургер", async () => {
    it("Появляется при ширине меньше 576px", async ({ browser }) => {
        await browser.url("http://localhost:3000/hw/store/");
        
        browser.setWindowSize(576, 857);
        await expect(browser.$(".Application-Toggler.navbar-toggler")).not.toBeDisplayed();

        browser.setWindowSize(575, 857);
        await expect(browser.$(".Application-Toggler.navbar-toggler")).toBeDisplayed();

    });
    it("Меню должно закрываться при выборе", async ({ browser }) => {
        await browser.url("http://localhost:3000/hw/store/");

        browser.setWindowSize(575, 857);
        await browser.$(".Application-Toggler.navbar-toggler").click();
        await browser.$(".Application-Menu.navbar-collapse .nav-link").click();

        await expect(browser.$(".Application-Menu.navbar-collapse")).not.toBeDisplayed();
    });
});