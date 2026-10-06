import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {

    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto('https://login.salesforce.com/');

    await page.getByRole('textbox', {
        name: 'Username'
    }).fill(process.env.SF_USERNAME!);

    await page.getByRole('button', {
        name: 'Log In'
    }).click();

    await page.getByRole('textbox', {
        name: 'Password'
    }).fill(process.env.SF_PASSWORD!);

    await page.getByRole('button', {
        name: 'Log In'
    }).click();

    console.log('Complete MFA manually');

    await page.waitForURL(/lightning/, {
    timeout: 300000
});

    await context.storageState({
        path: 'auth/storageState.json'
    });

    console.log('Storage State Saved');

    await browser.close();

})();