import { test } from '../src/fixtures/salesforce.fixture';
import leadData from '../data/leadData.json';
import { Actor } from '../src/actors/Actor';
import { CreateOpportunity } from '../src/tasks/CreateOpportunity';

test.setTimeout(120000);

test('S6 - Create High Value ULIP Opportunity', async ({ authenticatedPage }) => {

   const page = authenticatedPage;

const actor = new Actor(page);

const opportunity = leadData.highValueOpportunity;

    await page.goto(
        'https://zensartechnologiesltd3.lightning.force.com/lightning/page/home'
    );

    await page.waitForLoadState('domcontentloaded');
await actor.attemptsTo(
    CreateOpportunity.perform(opportunity)
);

    await test.info().attach(
    'S6 High Value ULIP Opportunity',
    {
        body: await page.screenshot(),
        contentType: 'image/png'
    }
);
});