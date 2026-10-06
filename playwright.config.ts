import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 120000,


  workers: 2,
  use: {
  headless: true,
},
  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright']
  ]
});
