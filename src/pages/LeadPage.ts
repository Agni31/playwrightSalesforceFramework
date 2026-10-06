import { Page, expect } from '@playwright/test';

export class LeadPage {
    constructor(private page: Page) {}

    async navigateToLeads() {

    await this.page.getByRole('button', {
        name: 'App Launcher'
    }).click();

    await this.page.getByRole('combobox', {
        name: 'Search apps and items...'
    }).fill('leads');

    await this.page.getByRole('option', {
        name: 'Leads'
    }).click();

    //await this.page.waitForTimeout(3000);
}

    async clickNewLead() {
        await this.page.getByRole('button', {
            name: 'New'
        }).click();
    }

    async createLead(data: any) {

   await this.page.getByRole('textbox', {
    name: 'First Name'
}).fill(data.firstName);

await this.page.getByRole('textbox', {
    name: 'Last Name'
}).fill(data.lastName);

await this.page.getByRole('textbox', {
    name: 'Company'
}).fill(data.company);

await this.page.getByRole('textbox', {
    name: 'Email'
}).fill(data.email);

await this.page.getByRole('textbox', {
    name: 'Phone'
}).fill(data.phone);

    // Lead Source
    await this.page.getByRole('combobox', {
    name: 'Lead Source'
}).click();

    await this.page.getByRole('option', {
        name: data.leadSource
    }).click();

    // Insurance Type
    await this.page.getByRole('combobox', {
    name: 'Insurance Type'
}).click();

    await this.page.getByRole('option', {
        name: data.insuranceType
    }).click();

    // Coverage
  await this.page.getByRole('spinbutton', {
    name: 'Coverage Amount'
}).fill(data.coverage);


  // Premium Frequency
if (data.premiumFrequency) {

    await this.page.getByRole('combobox', {
        name: 'Premium Frequency'
    }).click();

    await this.page.getByRole('option', {
        name: data.premiumFrequency
    }).click();
}

  // Lead Status
if (data.leadStatus && data.leadStatus !== 'New') {

    await this.page.getByRole('combobox', {
        name: 'Lead Status'
    }).click();

    await this.page.getByRole('option', {
    name: data.leadStatus,
    exact: true
}).click();
}
}

    async updateLeadStatus(status: string) {

    await this.page.getByRole('button', {
        name: 'Edit',
        exact: true
    }).click();

    await this.page.getByRole('combobox', {
        name: 'Lead Status'
    }).click();

    await this.page.getByRole('option', {
    name: status,
    exact: true
}).click();

    await this.page.getByRole('button', {
        name: 'Save',
        exact: true
    }).click();
}
async verifyLeadStatus(status: string) {

    await expect(
        this.page.getByLabel('Path Options')
            .getByTitle(status, { exact: true })
    ).toBeVisible();

}
    //s5
    async convertLead() {

    await this.page.getByRole('button', {
    name: 'Convert',
    exact: true
}).click();
}
    async createOpportunity(opportunityName: string) {

    await this.page.getByRole('button', {
        name: 'Opportunity'
    }).click();

    await this.page.getByRole('textbox', {
        name: 'Opportunity Name *'
    }).fill(opportunityName);

   await this.page.getByLabel('Convert Lead')
    .getByRole('button', {
        name: 'Convert'
    })
    .click();
}


   async saveLead() {
    await this.page.getByRole('button', {
        name: 'Save',
        exact: true
    }).click();
}

async selectSalutation() {

    await this.page.getByRole('combobox', {
        name: 'Salutation'
    }).click();

    await this.page.locator('span')
        .filter({ hasText: 'Mr.' })
        .first()
        .click();
}
}