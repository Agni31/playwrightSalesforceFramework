import { Page } from '@playwright/test';
import { LeadPage } from '../pages/LeadPage';

export class CreateLead {

    static perform(leadData: any) {

        return async (page: Page) => {

            const leadPage = new LeadPage(page);

            await leadPage.navigateToLeads();

            await leadPage.clickNewLead();

            await leadPage.selectSalutation();

            await leadPage.createLead(leadData);

            await leadPage.saveLead();
        };
    }
}