import { Page } from '@playwright/test';

export class OpportunityPage {

    constructor(private page: Page) {}

    async navigateToOpportunities() {

        await this.page.getByRole('button', {
            name: 'App Launcher'
        }).click();

        await this.page.getByRole('combobox', {
            name: 'Search apps and items...'
        }).fill('opportunities');

        await this.page.getByRole('option', {
            name: 'Opportunities'
        }).click();
    }
    async clickNewOpportunity() {

    await this.page.getByRole('button', {
        name: 'New'
    }).click();

}

async fillOpportunityName(opportunityName: string) {

    await this.page.getByRole('textbox', {
        name: 'Opportunity Name'
    }).fill(opportunityName);
}

async fillCloseDate(closeDate: string) {

    await this.page.getByRole('textbox', {
        name: 'Close Date'
    }).click();

    await this.page.getByRole('textbox', {
        name: 'Close Date'
    }).fill(closeDate);

    await this.page.keyboard.press('Tab');

    await this.page.waitForTimeout(2000);
}

async createAccount(accountName: string) {

    await this.page.getByRole('combobox', {
        name: 'Account Name'
    }).click();

    await this.page.getByText('New Account').click();

    await this.page.waitForTimeout(1000);

    await this.page.getByRole('textbox', {
        name: 'Account Name'
    }).fill(accountName);

    await this.page.getByRole('button', {
        name: 'Save',
        exact: true
    }).click();

    await this.page.waitForTimeout(3000);
}
async fillOpportunityDetails(data: any) {

    // Insurance Type
    await this.page.getByRole('combobox', {
        name: 'Insurance Type'
    }).click();

    await this.page.getByText(
    data.insuranceType,
    { exact: true }
).click();

    // Stage
    await this.page.getByRole('combobox', {
        name: 'Stage'
    }).click();

    await this.page.getByRole('option', {
    name: data.stage
}).click();

    // Probability
    const probabilityField = this.page.getByRole('spinbutton', {
        name: 'Probability (%)'
    });

    await probabilityField.clear();
    await probabilityField.fill(data.probability);

    // Amount
    await this.page.getByRole('spinbutton', {
        name: 'Amount'
    }).fill(data.amount);

    // Lead Source
    await this.page.getByRole('combobox', {
        name: 'Lead Source'
    }).click();

    await this.page.getByText(
    data.leadSource,
    { exact: true }
).click();

    // Description
    await this.page.getByRole('textbox', {
        name: 'Description'
    }).fill(data.description);
}
async saveOpportunity() {

    await this.page.getByRole('button', {
        name: 'Save',
        exact: true
    }).click();

    await this.page.waitForTimeout(5000);
}
async createOpportunity(data: any) {

    await this.clickNewOpportunity();

    await this.fillOpportunityName(
        data.opportunityName
    );

    await this.fillCloseDate(
        data.closeDate
    );

    await this.createAccount(
        data.accountName
    );

    await this.fillOpportunityDetails(
        data
    );

    await this.saveOpportunity();
}

async updateOpportunity(
    closeDate: string,
    stage: string,
    amount: string
) {

    await this.page.locator('.slds-checkbox_faux')
        .first()
        .click();

    await this.page.getByRole('button', {
        name: 'Show Actions'
    }).first().click();

    await this.page.getByRole('menuitem', {
        name: 'Edit',
        exact: true
    }).click();

    await this.page.getByRole('textbox', {
        name: 'Close Date'
    }).fill(closeDate);

    await this.page.getByRole('combobox', {
        name: 'Stage'
    }).click();

    await this.page.getByText(stage).click();

    await this.page.getByRole('spinbutton', {
        name: 'Amount'
    }).fill(amount);

    await this.page.getByRole('button', {
        name: 'Save',
        exact: true
    }).click();
}

async navigateToConvertedOpportunity() {

    await this.page.getByText(
        'Your lead has been converted'
    ).waitFor();

    console.log('Conversion popup displayed');

    await this.page.getByRole('button', {
        name: 'Go to Leads'
    }).click();

    console.log('Clicked Go to Leads');

    await this.page.getByRole('link', {
        name: 'Opportunities'
    }).click();
}
}