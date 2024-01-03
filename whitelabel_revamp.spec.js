const { test, expect , devices } = require('@playwright/test');
//const { initializePage } = require('./pageInitialization');
const { waitForElement } = require('./elementUtils');
const { performAction, safelyPerformAction } = require('./pageActions');
const { clickViewAllButton } = require('./navigationActions');

//const iPhone11 = devices['iPhone 11'];

let context;
//let page;

let page;
// Select a device to emulate
const iPhone11 = devices['iPhone 11'];

test.beforeEach(async ({ browserName, browser}) => {
    //const { context, page } = await initializePage(browserName, browser, iPhone11);
    // const { page } = await initializePage(browser);
    //console.log(page); // This should log the Page object to verify it's correct
    //console.log(context);

    // if (!page || typeof page.locator !== 'function') {
    //     throw new Error('The page object is not initialized correctly.');
    // }
    if (browserName === 'firefox') {
        // Create context without mobile emulation for Firefox
        context = await browser.newContext();
      } else {
        // Create context with mobile emulation for other browsers
        context = await browser.newContext({ ...iPhone11 });
      }
      page = await context.newPage();


    await page.goto('http://35.208.67.169:3008/');
    const h1Element = page.locator('//h1[text()="Customer Registration"]', { timeout: 300000 }).first();
    await expect(h1Element).toBeVisible();
    //await waitForElement('//h1[text()="Customer Registration"]');
    await performAction(page,'fill', 'input[type="text"]', '110110');
    await performAction(page,'click', 'div.registration_row__aYrgl input[type="submit"]');
    try {
        await performAction(page,'click','button.HKButton_mainButton__lc0N7.HKButton_small__EGz0m:has-text("Skip")');
    } catch (error) {
        console.error('Error clicking nextButton1:', error);
    }

    await waitForElement(page,'//h1[text()="Quick Add Transactions"]');
    console.log('Test onboarding has been passed');
}, { timeout: 60000 });

test.afterEach(async () => {
    if (page && !page.isClosed()) {
        await page.close();
    }
});

test('Budget', async ({ }) => {
  await page.locator('.dashboard_othersSec__xZDhj > div > .QuickAddTransactionGroup_quick-add-transaction-items__ZpTT6 > div:nth-child(2) > .HKRoundedCornerButton_HK-RoundedButton-main__iNcDp > .HKRoundedCornerButton_HK-RoundedButton__5thQz').click();
  await page.getByRole('button', { name: 'plus_icon_image ADD BUDGET' }).click();
  await page.getByPlaceholder('0').click();
  await page.getByPlaceholder('0').fill('1,1011');
  await page.locator('div').filter({ hasText: /^Personal$/ }).getByRole('img').click();
  await page.getByRole('img', { name: 'toggle_switch' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
    console.log('The test for adding a Budget has been successfully created.');
});


test('Verify Add Transfer', async ({}) => {
  await page.locator('div:nth-child(3) > .HKRoundedCornerButton_HK-RoundedButton-main__iNcDp > .HKRoundedCornerButton_HK-RoundedButton__5thQz').first().click();
  await page.getByPlaceholder('0').click();
  await page.getByRole('button', { name: '7' }).click();
  await page.getByRole('button', { name: '8' }).click();
  await page.getByRole('button', { name: '9' }).click();
  await page.getByRole('button', { name: '5' }).click();
  await page.getByPlaceholder('0').click();
  await page.locator('.HKAccountsSelectionItem_icon-fab-area-account__rSs6f').first().click();
  await page.locator('div:nth-child(3) > .HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF > .HKAccountsSelectionItem_icon-fab-area-account__rSs6f').click();
  await page.locator('section').filter({ hasText: 'Date' }).locator('div').click();
  await page.getByRole('cell', { name: '5' }).first().click();
  await page.getByRole('button', { name: 'Apply' }).first().click();
  await page.locator('section').filter({ hasText: 'Descriptions' }).click();
  await page.locator('section').filter({ hasText: 'Descriptions' }).getByRole('img').click();
  await page.getByPlaceholder('Add a description for your').click();
  await page.getByPlaceholder('Add a description for your').fill('test');
  await page.getByRole('button', { name: 'Apply' }).click();
  
  }, { timeout: 60000 });
  