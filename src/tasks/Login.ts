import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export class Login {

    static login() {
        return async (page: Page) => {

            const loginPage = new LoginPage(page);

            await loginPage.login(
                process.env.SF_USERNAME!,
                process.env.SF_PASSWORD!
            );
        };
    }
}