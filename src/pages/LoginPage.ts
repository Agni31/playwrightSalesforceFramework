import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    async login(username: string, password: string) {
        await this.page.goto(process.env.SF_URL!);

        await this.page.getByLabel('Username').fill(username);

        await this.page.getByLabel('Password').fill(password);

        await this.page.getByRole('button', {
            name: 'Log In'
        }).click();
    }
}