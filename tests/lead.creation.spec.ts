import { test, expect } from '../src/fixtures/salesforce.fixture';
import leadData from '../data/leadData.json';
import { Actor } from '../src/actors/Actor';
import { CreateLead } from '../src/tasks/CreateLead';
import { LeadPage } from '../src/pages/LeadPage';
import { CreateEmptyLead } from '../src/tasks/CreateEmptyLead';


test.setTimeout(120000);// 15sec
test('S1 - Create Term Life Insurance Lead', async ({ authenticatedPage }) => {

   const page = authenticatedPage; 

   const actor = new Actor(page);

    const termLifeLead = leadData.termLifeLead;
    const leadPage = new LeadPage(page);

    await page.goto(
  'https://zensartechnologiesltd3.lightning.force.com/lightning/page/home'
);

await page.waitForLoadState('domcontentloaded');

//console.log('Current URL:', page.url());
//console.log('Page Title:', await page.title());

await page.screenshot({
    path: 'home-page-debug.png',
    fullPage: true
});


await actor.attemptsTo(
    CreateLead.perform(termLifeLead)
);

    await page.waitForTimeout(5000);

    await test.info().attach(
    'Lead Created Screenshot',
    {
        body: await page.screenshot(),
        contentType: 'image/png'
    }
);


});


// S2 Starts Here

test('S2 - Create Whole Life Insurance Lead with Monthly Premium', async ({ authenticatedPage }) => {

    const page = authenticatedPage;
       

  const wholeLifeLead = leadData.wholeLifeLead; // S2 data from leadData.json
  const leadPage = new LeadPage(page);
        await page.goto(
    'https://zensartechnologiesltd3.lightning.force.com/lightning/page/home'
    );

    await page.waitForLoadState('domcontentloaded');

    const actor = new Actor(page);

await actor.attemptsTo(
    CreateLead.perform(wholeLifeLead)
);
    await page.waitForTimeout(5000);

    // Evidence Screenshot
    await test.info().attach(
        'S2 Whole Life Lead Screenshot',
        {
            body: await page.screenshot(),
            contentType: 'image/png'
        }
    );
    });

//// S3 Starts Here
   test('S3 - Mandatory Field Validation', async ({ authenticatedPage }) => {

  const page = authenticatedPage;
    const leadPage = new LeadPage(page);
    const actor = new Actor(page);

    await page.goto(
        'https://zensartechnologiesltd3.lightning.force.com/lightning/page/home'
    );

    await page.waitForLoadState('domcontentloaded');

    await actor.attemptsTo(
    CreateEmptyLead.perform()
);
    await page.waitForTimeout(3000);


    await expect(
    page.getByRole('link', {
        name: 'Name'
    })
    ).toBeVisible();

    console.log('Mandatory field validation displayed successfully');

    await test.info().attach(
    'S3 Validation Screenshot',
    {
        body: await page.screenshot(),
        contentType: 'image/png'
    }
);

});