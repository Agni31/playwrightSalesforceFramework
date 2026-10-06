import { Page } from '@playwright/test';
import { LeadPage } from '../pages/LeadPage';

export class ConvertLead {

    static perform(opportunityName: string) {

        return async (page: Page) => {

            const leadPage = new LeadPage(page);

            await leadPage.convertLead();

            await leadPage.createOpportunity(
                opportunityName
            );
        };
    }
}