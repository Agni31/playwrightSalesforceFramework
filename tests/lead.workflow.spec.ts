import { test, expect } from '../src/fixtures/salesforce.fixture';
import { LeadPage } from '../src/pages/LeadPage';
import leadData from '../data/leadData.json';
import { Actor } from '../src/actors/Actor';
import { CreateLead } from '../src/tasks/CreateLead';
import { UpdateLeadStatus } from '../src/tasks/UpdateLeadStatus';
import { ConvertLead } from '../src/tasks/ConvertLead';
import { OpportunityPage } from '../src/pages/OpportunityPage';

test.setTimeout(120000);

test('S4 - Update Lead Status New to Qualified', async ({ authenticatedPage }) => {

    const page = authenticatedPage;

    const leadPage = new LeadPage(page);

    const actor = new Actor(page);

const workflowLead = leadData.statusWorkflowLead;

    // Reuse S2 lead creation flow here
    await page.goto(
    'https://zensartechnologiesltd3.lightning.force.com/lightning/page/home'
);

await page.waitForLoadState('domcontentloaded');

await actor.attemptsTo(
    CreateLead.perform(workflowLead)
);

console.log('Lead created successfully');

await actor.attemptsTo(
    UpdateLeadStatus.perform('Working')
);

await actor.attemptsTo(
    UpdateLeadStatus.perform('Qualified')
);

console.log('Status updated to Qualified');

await test.info().attach(
    'S4 Lead Status Updated',
    {
        body: await page.screenshot(),
        contentType: 'image/png'
    }
);

});

test('S5 - Create Life Insurance Opportunity from Qualified Lead', async ({ authenticatedPage }) => {

    const page = authenticatedPage;

    const leadPage = new LeadPage(page);

    const opportunityPage = new OpportunityPage(page);

    const actor = new Actor(page);

    const qualifiedLead = leadData.qualifiedLead;

    const opportunityData = leadData.opportunityData;


    await page.goto(
    'https://zensartechnologiesltd3.lightning.force.com/lightning/page/home'
);

await page.waitForLoadState('domcontentloaded');

await actor.attemptsTo(
    CreateLead.perform(qualifiedLead)
);

console.log('Qualified Lead created successfully');

await actor.attemptsTo(
    ConvertLead.perform(
        opportunityData.opportunityName
    )
);


console.log('Lead converted successfully');

await opportunityPage.navigateToConvertedOpportunity();

await opportunityPage.updateOpportunity(
    opportunityData.closeDate,
    opportunityData.stage,
    opportunityData.amount
);

await page.waitForTimeout(5000);

await test.info().attach(
    'S5 Opportunity Created',
    {
        body: await page.screenshot(),
        contentType: 'image/png'
    }
);

console.log('Opportunity updated successfully');

});