import { Page } from '@playwright/test';
import { LeadPage } from '../pages/LeadPage';


export class CreateEmptyLead {

    static perform() {

        return async (page: Page) => {

            const leadPage = new LeadPage(page);

            await leadPage.navigateToLeads();

            await leadPage.clickNewLead();

            await leadPage.saveLead();
        };
    }
}