import { test as base, Page } from '@playwright/test';
import { getAuthenticatedContext } from '../utils/auth-utils';

type SalesforceFixtures = {
    authenticatedPage: Page;
};

export const test = base.extend<SalesforceFixtures>({
    authenticatedPage: async ({ browser }, use) => {

        const context = await getAuthenticatedContext(browser);

        const page = await context.newPage();

        await use(page);

        await context.close();
    }
});

export { expect } from '@playwright/test';