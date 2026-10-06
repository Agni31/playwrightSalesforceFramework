import { Browser, BrowserContext } from '@playwright/test';
import fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const STORAGE_FILE = 'auth/storageState.json';

const HOME_URL =
  'https://zensartechnologiesltd3.lightning.force.com/lightning/page/home';

const LOGIN_URL =
  'https://login.salesforce.com';

export async function getAuthenticatedContext(
  browser: Browser
): Promise<BrowserContext> {

  const fileExists = fs.existsSync(STORAGE_FILE); // checks storageState.json already exists.

  // First Run
  if (!fileExists) {
    console.log('No storage state found. Login required.');
    return await performLogin(browser);
  }

  // Use Existing Session
  const context = await browser.newContext({
    storageState: STORAGE_FILE
  });// Creates a browser context

  const page = await context.newPage();

  await page.goto(HOME_URL, {
  waitUntil: 'commit',
  timeout: 120000
});

  const currentTitle = await page.title();
const currentUrl = page.url();

await page.close();

if (
    currentTitle !== 'Login | Salesforce'
) {
    console.log('Using existing session.');
    return context;
}

  // Session Expired
  console.log(
    'Session expired. Generating new authentication state.'
  );

  await context.close();

  if (fs.existsSync(STORAGE_FILE)) {
    fs.unlinkSync(STORAGE_FILE);
  }

  return await performLogin(browser);
}

async function performLogin(
  browser: Browser
): Promise<BrowserContext> {

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto(LOGIN_URL);

  await page.getByRole('textbox', {
    name: 'Username'
}).fill(process.env.SF_USERNAME!);

await page.getByRole('button', {
    name: 'Log In'
}).click();

await page.getByRole('textbox', {
    name: 'Password'
}).fill(process.env.SF_PASSWORD!);

await page.getByRole('button', {
    name: 'Log In'
}).click();

  console.log('Complete MFA manually');

  await page.waitForURL(/lightning\/page\/home/, {
    timeout: 300000
});

  await context.storageState({
    path: STORAGE_FILE
  });

  console.log(
    'New storageState.json created.'
  );

  return context;
}
