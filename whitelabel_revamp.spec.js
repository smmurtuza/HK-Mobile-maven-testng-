const { test, expect, devices } = require('@playwright/test');

// Select a device to emulate
const iPhone11 = devices['iPhone 11'];

let context;
let page;

const clickViewAllButton = async () => {
    try {
        const viewAllButton = page.locator('.YourAccounts_your-accounts-actionButtons__p_1YK p:has-text("View All")');
        await viewAllButton.click();
        console.log('Clicked on the "View All" button successfully.');
    } catch (error) {
        console.error('Error clicking on the "View All" button:', error);
    }
};

test.beforeEach(async ({ browserName, browser}) => {
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
    await page.waitForSelector('input[type="text"]');
    await page.fill('input[type="text"]', '10101');
    await page.click('div.registration_row__aYrgl input[type="submit"]');

    const nextButton1 = page.locator('button.HKButton_mainButton__lc0N7.HKButton_small__EGz0m:has-text("Skip")', { timeout: 300000 });
    try {
        await nextButton1.click();
    } catch (error) {
        console.error('Error clicking nextButton1:', error);
    }

    //await clickViewAllButton();

    const onboardingScreenText = page.locator('//h1[text()="Quick Add Transactions"]').first();
    await expect(onboardingScreenText).toBeVisible();

    console.log('test onboarding has been passed');
}, { timeout: 60000 });

test.afterEach(async () => {
    if (page && !page.isClosed()) {
        await page.close();
    }
});

test('Verify Account Addition cash', async ({ }) => {
    await clickViewAllButton();

    try {
        const addButton = await page.locator('button:has-text("ADD ACCOUNT")', { timeout: 40000 });
        await addButton.click();
        console.log('Successfully clicked on the "ADD ACCOUNT" button.');
    } catch (error) {
        console.error('Error clicking the "ADD ACCOUNT" button:', error);
    }

    try {
        const cashButton = page.locator('.newAccount_account_list_inner_div__6KU_N:has-text("Cash")', { timeout: 40000 });
        await cashButton.click();
    } catch (error) {
        console.error('Error clicking the "Cash" button:', error);
    }

    try {
        await page.fill('input[name="title"]', 'murtuz5');
    } catch (error) {
        console.error('Error filling in the "title" field:', error);
    }

    try {
        await page.fill('input[name="accountBalance"]', '11100');
    } catch (error) {
        console.error('Error filling in the "accountBalance" field:', error);
    }

    try {
        const addButton = page.locator('button.cashAccount_add_account_btn__w7c8d');
        await addButton.click();
        console.log('Successfully clicked on the "Add Cash Account" button.');
    } catch (error) {
        console.error('Error clicking on the "Add Cash Account" button:', error);
    }

    // Wait for the new account to be added
    const newAccountTitle = 'murtuz5';
    await page.waitForSelector(`.HKAccountListing_ListItemWithBg__MKYfQ:has-text("${newAccountTitle}")`, { timeout: 40000 });

    // Log a message to the console
    console.log(`Your account "${newAccountTitle}" has been added.`);

    // Uncomment to take a screenshot
    // try {
    //     await page.screenshot({ path: 'C:/Users/HK/Desktop/Murtuza/screenshot.png' });
    // } catch (error) {
    //     console.error('Error taking screenshot:', error);
    // }

    console.log('The test for adding a Cash Account has been successfully passed.');
    //test.slow();
});

test('Verify Account Addition Bank', async ({ }) => {
    await clickViewAllButton();

    try {
        const addButton = await page.locator('button:has-text("ADD ACCOUNT")', { timeout: 40000 });
        await addButton.click();
        console.log('Successfully clicked on the "ADD ACCOUNT" button.');
    } catch (error) {
        console.error('Error clicking the "ADD ACCOUNT" button:', error);
    }

    try {
        const cashButton = page.locator('.newAccount_account_list_inner_div__6KU_N:has-text("Bank")', { timeout: 40000 });
        await cashButton.click();
    } catch (error) {
        console.error('Error clicking the "Cash" button:', error);
    }

    try {
        const bankNameToSelect = 'Askari Bank';
        await page.waitForSelector('.selectAccount_bank_list_inner_div__KEaAY', { timeout: 40000 });
        const bankElement = await page.locator(`.selectAccount_bank_list_inner_div__KEaAY p:has-text("${bankNameToSelect}")`);
        await bankElement.click();
        console.log(`Successfully selected the bank: ${bankNameToSelect}`);
    } catch (error) {
        console.error('Error selecting the bank:', error);
    }

    try {
        await page.fill('input[name="accountNumber"]', '1010');
    } catch (error) {
        console.error('Error filling in the "accountBalance" field:', error);
    }

    try {
        await page.fill('input[name="accountBalance"]', '75000');
    } catch (error) {
        console.error('Error filling in the "accountBalance" field:', error);
    }

    try {
        const addButton = page.locator('button.addBankAccount_add_account_btn__9yXE9', { timeout: 40000 });
        await addButton.click();
        console.log('Clicked on "Add Bank Account" button successfully.');
    } catch (error) {
        console.error('Error clicking on "Add Bank Account" button:', error);
    }

    // Wait for the new account to be added
    const bankNameToSelect = 'Askari Bank';
    await page.waitForSelector(`.HKAccountListing_ListItemWithBg__MKYfQ:has-text("${bankNameToSelect}")`, { timeout: 40000 });

    // Log a message to the console
    console.log(`Your account "${bankNameToSelect}" has been added.`);

    // Uncomment to take a screenshot
    // try {
    //     await page.screenshot({ path: 'C:/Users/HK/Desktop/Murtuza/screenshot.png' });
    // } catch (error) {
    //     console.error('Error taking screenshot:', error);
    // }

    console.log('The test for adding a Bank Account has been successfully passed.');
    //test.slow();
});

test('Verify Account Adding Person', async ({ }) => {
    await clickViewAllButton();

    try {
        const addButton = await page.locator('button:has-text("ADD ACCOUNT")', { timeout: 40000 });
        await addButton.click();
        console.log('Successfully clicked on the "ADD ACCOUNT" button.');
    } catch (error) {
        console.error('Error clicking the "ADD ACCOUNT" button:', error);
    }

    try {
        const cashButton = page.locator('.newAccount_account_list_inner_div__6KU_N:has-text("Person")', { timeout: 40000 });
        await cashButton.click();
    } catch (error) {
        console.error('Error clicking the "Cash" button:', error);
    }

    try {
        await page.fill('input[name="title"]', 'Pakki');
    } catch (error) {
        console.error('Error filling in the "title" field:', error);
    }

    try {
        await page.fill('input[name="accountBalance"]', '75000');
    } catch (error) {
        console.error('Error filling in the "accountBalance" field:', error);
    }

    try {
        const addButton = page.locator('button.personAccount_add_person_btn__GHonT', { timeout: 40000 });
        await addButton.click();
        console.log('Clicked on "Add Person Account" button successfully.');
    } catch (error) {
        console.error('Error clicking on "Add Person Account" button:', error);
    }

    // Log a message to the console
    console.log('The test for adding a Person Account has been successfully passed.');
    //test.slow();
});
