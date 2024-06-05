const { test, expect, devices } = require('@playwright/test');
//const { initializePage } = require('./pageInitialization');
const { waitForElement } = require('./elementUtils');
const { performAction, safelyPerformAction } = require('./pageActions');
const { selectBankImage,generateUniqueAccountName,bankImages} = require('./navigationActions');
const { verifyExpectedToastMessage } = require('./ToastMessage');
const { time } = require('console');

//const iPhone11 = devices['iPhone 11'];

let context; let page;
// Select a device to emulate
const iPhone11 = devices['iPhone 11'];

test.beforeEach(async ({ browserName, browser }) => {

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
    await performAction(page, 'fill', 'input[type="text"]', '2000');
    await performAction(page, 'click', 'div.registration_row__aYrgl input[type="submit"]');
    try {
        await performAction(page, 'click', 'button.HKButton_mainButton__lc0N7.HKButton_small__EGz0m:has-text("Skip")');
    } catch (error) {
        console.error('Error clicking nextButton1:', error);
    }

    await waitForElement(page, '//h1[text()="Quick Add Transactions"]');
    console.log('Test onboarding has been passed');
}, { timeout: 60000 });

test.afterEach(async () => {
    if (page && !page.isClosed()) {
        await page.close();
    }
});

test('Saving Goals', async ({ }) => {
    //await clickViewAllButton(page);
    await page.getByRole('link', { name: 'add-transaction savings' }).click();
    await expect(page.getByRole('heading', { name: 'Saving Goals' }).nth(1)).toBeVisible();
    await page.waitForSelector('button:has-text("ADD GOAL")', { timeout: 5000 });
    await page.click('button:has-text("ADD GOAL")');
    console.log('Clicked on the "ADD GOAL" button successfully.');

    await expect(page.getByText('What are you saving?')).toBeVisible();

    await page.waitForTimeout(5000);

    //await page.pause();

    const textArray = ['saving category Child Care', 'BNPL', 'Committee Installment', 'Credit Card Bills','Dining Out','Donations and Charity','Education','Electronics & Appliances','Emergency','Entertainment','Entertainment'];

  for (const text of textArray) {
    const selector = `p:has-text("${text}")`;
    if (await page.$(selector, { timeout: 10000 })) {
        await page.click(selector, { timeout: 10000 });
      console.log(`Clicked on ${text}`);
      break; // Exit loop after clicking the first found element
    }
  } 
  await page.waitForTimeout(2000);
    
    await page.getByPlaceholder('Coursera').click();
    const uniqueAccountName1 = generateUniqueAccountName('Test Saving Goal for murtuza');
    console.log(uniqueAccountName1);
    await safelyPerformAction(page, 'fill', 'input[placeholder="Coursera"]',uniqueAccountName1);
    await page.getByRole('button', { name: 'In 6 months' }).click();
    await page.getByPlaceholder('PKR').click();
    await page.getByPlaceholder('PKR').fill('6000');
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'New Saving Goal:Rules' })).toBeVisible();
    await page.getByRole('img', { name: 'toggle_image' }).nth(1).click();
    await page.waitForTimeout(2000);
    await page.waitForLoadState('networkidle');  // Waits until there are no more than 2 network connections for at least 500 ms.

    let fromAccountSelector;
    try {
        fromAccountSelector = await selectBankImage(page, bankImages), { state: 'visible' };
    } catch (error) {
        console.log('Error selecting "from" account:', error);
        return;
    }
        await page.getByRole('button', { name: 'Save Goal' }).click();
 
        await verifyExpectedToastMessage(page, 'Goal created');  

        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(5000);
        await expect(page.getByText(uniqueAccountName1), { timeout: 10000 }).toBeVisible();
        await page.click(`text=${uniqueAccountName1}`);

        //await page.pause();

        //await page.pause();
        //await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        await page.waitForSelector('button:has-text("ADD SAVINGS")', { timeout: 10000 });
        await page.click('button:has-text("ADD SAVINGS")', { timeout: 10000 });

    //await page.waitForTimeout(1000);
    
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('input.HKAmountField_currency-format-input__bIHOc', { state: 'visible' });
    const amount = '1200';
    await page.waitForSelector('input.HKAmountField_currency-format-input__bIHOc', { state: 'visible' });
    await page.fill('input.HKAmountField_currency-format-input__bIHOc', amount, { timeout: 10000 });
    console.log('Filled the input field with:', amount);
    await expect(page.getByRole('heading', { name: 'Saving Date' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Add Saving Transaction' })).toBeVisible();

    // Wait for the image element to be visible on the page
    await page.waitForSelector('img[src="/_next/static/media/Event.8d2a843b.svg"]', { state: 'visible' });
    await page.waitForSelector('.transaction_input_date_div__vvb0i input', { timeout: 10000 });
    await page.click('.transaction_input_date_div__vvb0i input');
    //await page.pause();
    console.log('Clicked on the image successfully.');
    const SavingDate = '2'; // Specify the day you want to click
    // Construct the XPath selector to locate the <td> element with the specified text
    const xpathSelector1 = `//td[text()='${SavingDate}']`;
    // Click on the <td> element
    await page.click(xpathSelector1);
    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');
    await page.waitForTimeout(2000);
    //let SourceAccountSelector;
    try {
        SourceAccountSelector = await selectBankImage(page, bankImages);
    } catch (error) {
        console.log('Error selecting "from" account:', error);
        // Continue to the next step regardless of the error
    }
    await page.waitForLoadState('networkidle');  // Waits until there are no more than 2 network connections for at least 500 ms.
    await page.waitForSelector('button:has-text("Save")',{state: 'visible', timeout: 10000});
    await page.click('button:has-text("Save")');

    await page.waitForLoadState('networkidle');  // Waits until there are no more than 2 network connections for at least 500 ms.
    //await page.waitForTimeout(2000);

    await verifyExpectedToastMessage(page, 'Account created');

    await page.waitForSelector('p:has-text("Mark Goal As Achieved")', { state: 'visible' });
    //await page.pause();
    await page.getByRole('button', { name: 'Mark Goal As Achieved' }).click();
    // For example, wait for a navigation or a new element to confirm the action
    await page.waitForNavigation();

    await page.waitForTimeout(4000);

    await page.waitForSelector('p:has-text("Continue")', { state: 'visible' });
    await page.click('p:has-text("Continue")');

    await page.waitForSelector('p:has-text("Save Details")', { state: 'visible' });
    await page.click('p:has-text("Save Details")');
// // Verify that the toast message "Account created" is displayed
await verifyExpectedToastMessage(page, 'Account created');

    //await expect(page.getByRole('heading', { name: 'Goal Achievement' })).toBeVisible();


    await page.pause();
    const screenshotPath = `C:/Users/HK/Desktop/Murtuza/HK-REVAMP/whitelabel_revamp.spec.js/screenshots/goal/Cash-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath });
    console.log(`Saving screenshot to: ${screenshotPath}`);
    console.log('Creating a Goal Account has been successfully passed.');
  // await expect(page.locator('div').filter({ hasText: /^Set a reminder to save against this goal$/ }).getByRole('img')).toBeVisible();
  
});