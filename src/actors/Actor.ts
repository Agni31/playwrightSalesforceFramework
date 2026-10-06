import { Page } from '@playwright/test';

export class Actor {
    constructor(private page: Page) {}

    async attemptsTo(task: (page: Page) => Promise<void>) {
        await task(this.page);
    }

    getPage(): Page {
        return this.page;
    }
}