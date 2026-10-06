import { setWorldConstructor, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
}

setWorldConstructor(CustomWorld);

Before(async function () {

    this.browser = await chromium.launch({
        headless: false
    });

    this.context = await this.browser.newContext({
        storageState: 'auth/storageState.json'
    });

    this.page = await this.context.newPage();
});

After(async function () {
    await this.browser.close();
});