import { Page } from '@playwright/test';
import { LeadPage } from '../pages/LeadPage';

export class UpdateLeadStatus {

    static perform(status: string) {

        return async (page: Page) => {

            const leadPage = new LeadPage(page);

            await leadPage.updateLeadStatus(status);

            await leadPage.verifyLeadStatus(status);
        };
    }
}