import { Page } from '@playwright/test';
import { OpportunityPage } from '../pages/OpportunityPage';

export class CreateOpportunity {

    static perform(opportunityData: any) {

        return async (page: Page) => {

            const opportunityPage = new OpportunityPage(page);

            await opportunityPage.navigateToOpportunities();

            await opportunityPage.createOpportunity(
                opportunityData
            );
        };
    }
}