import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Given('I am logged into Salesforce as a sales agent', async function (this: CustomWorld) {
    console.log('Already authenticated using storageState');
});

Given('I navigate to the Leads module', async function (this: CustomWorld) {
    console.log('Navigate to Leads');
});

When('I click on New Lead', async function (this: CustomWorld) {
    console.log('Click New Lead');
});

When('I create a lead using test data', async function (this: CustomWorld) {
    console.log('Create Lead using JSON data');
});

When('I save the lead', async function (this: CustomWorld) {
    console.log('Save Lead');
});

Then('the lead should be created successfully', async function () {
    console.log('Lead Created Successfully');
});

Then('I should see the lead first name', async function () {
    console.log('Verify First Name');
});

Then('I should see the insurance type', async function () {
    console.log('Verify Insurance Type');
});
``