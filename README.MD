#### Install playwright & checkly

```shell
# https://playwright.dev/docs/intro
npm init playwright@latest # will generate playwright.config.ts
npm i --save-dev @playwright/test@latest 
npm i --save-dev checkly@latest
```

#### Config (playwright.config.ts & checkly.config.ts)

##### playwright.config.ts 

```typescript
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60000,
  expect: {timeout: 10000},
  testDir: './__checks__',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
```

##### checkly.config.ts

```typescript
import { defineConfig } from 'checkly'
import { RetryStrategyBuilder } from 'checkly/constructs'

/**
 * See https://www.checklyhq.com/docs/cli/project-structure/
 */
const config = defineConfig({
  /* A human friendly name for your project */
  projectName: 'checkly-demo',
  /** A logical ID that needs to be unique across your Checkly account,
   * See https://www.checklyhq.com/docs/cli/constructs/ to learn more about logical IDs.
   */
  logicalId: 'checkly-demo-project',
  /* An optional URL to your Git repo to be shown in your test sessions and resource activity log */
  /* repoUrl: 'https://github.com/checkly/checkly-cli', */
  /* Sets default values for Checks */
  checks: {
    /* A default for how often your Check should run in minutes */
    frequency: 10,
    /* Checkly data centers to run your Checks as monitors */
    locations: ['us-east-1', 'eu-west-1'],
    /* An optional array of tags to organize your Checks */
    tags: ['mac'],
    /** The Checkly Runtime identifier, determining npm packages and the Node.js version available at runtime.
     * See https://www.checklyhq.com/docs/cli/npm-packages/
     */
    runtimeId: '2023.02',
    /* Failed check runs will be retried before triggering alerts */
    retryStrategy: RetryStrategyBuilder.fixedStrategy({ baseBackoffSeconds: 60, maxRetries: 4, sameRegion: true }),
    /* A glob pattern that matches the Checks inside your repo, see https://www.checklyhq.com/docs/cli/using-check-test-match/ */
    checkMatch: '**/__checks__/**/*.check.ts',
    browserChecks: {
      /* A glob pattern matches any Playwright .spec.ts files and automagically creates a Browser Check. This way, you
      * can just write native Playwright code. See https://www.checklyhq.com/docs/cli/using-check-test-match/
      * */
      testMatch: '**/__checks__/**/*.spec.ts',
    },
  },
  cli: {
    /* The default datacenter location to use when running npx checkly test */
    runLocation: 'eu-west-1',
    /* An array of default reporters to use when a reporter is not specified with the "--reporter" flag */
    reporters: ['list'],
  },
})

export default config
```

#### Run test

```shell
npx playwright test 
npx checkly test # need login checkly or set CHECKLY_ACCOUNT_ID and CHECKLY_API_KEY env as below:
export CHECKLY_ACCOUNT_ID=8cf9cab3-e80b-402d-a091-0f0432943282
export CHECKLY_API_KEY=cu_b98f3d22f6564e8d838d0b5fb60a19d1
```

#### Deploy test

```shell
npx checkly deploy # need login checkly or set CHECKLY_ACCOUNT_ID,CHECKLY_API_KEY env 
```

## Environment Variables(use .env file)

```sehll
# .env in current dir
baseUrl=https://gadero.vercel.app
passWord=gadero2023
productslug=picknicktafel-gadero
```

##### playwright

```typescript
// https://playwright.dev/docs/test-parameterize#passing-environment-variables
// playwright.config.ts 
import dotenv from 'dotenv'; 
dotenv.config(); // Read from default ".env" file.
// or
require('dotenv').config();
```

##### checkly

```shell
# https://www.checklyhq.com/docs/cli/using-environment-variables/
# run test with .env file
npx checkly test --env-file='./.env' 
# managing remote environment variables using the cli
# add env PassWD
npx checkly env add PassWD
What is the value of PassWD?: ***
Environment variable PassWD added.
# list env 
npx checkly env ls 
Environment variables:
baseUrl=https://gadero.vercel.app
passWord=gadero2023
PassWD=123
```

##### use env value

```typescript
 const baseURL: string = process.env.baseUrl as string;
```

