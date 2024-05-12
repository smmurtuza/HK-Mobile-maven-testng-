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
    await performAction(page,'fill', 'input[type="text"]', '11232100');
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

test('Verify Account Addition cash', async ({ }) => {
    await clickViewAllButton(page);
    await safelyPerformAction(page,'click', 'button:has-text("ADD ACCOUNT")');
    await safelyPerformAction(page,'click', '.newAccount_account_list_inner_div__6KU_N:has-text("Cash")');
    await safelyPerformAction(page,'fill', 'input[name="title"]', 'Murtuz');
    await safelyPerformAction(page,'fill', 'input[name="accountBalance"]', '11100');
    await safelyPerformAction(page,'click', 'button.cashAccount_add_account_btn__w7c8d');
    //await waitForElement(page,`.HKAccountListing_ListItemWithBg__MKYfQ:has-text("Rida")`);
    console.log('1st The test for adding a Cash Account has been successfully passed.');
});

test('Verify Account Addition Bank', async ({ }) => {
    await clickViewAllButton(page);
    // await waitForSelector(page,'click', 'button:has-text("ADD ACCOUNT")');
    // await waitForSelector(page,'click', '.newAccount_account_list_inner_div__6KU_N:has-text("Bank")');
    await page.waitForSelector('button:has-text("ADD ACCOUNT")');
    await page.click('button:has-text("ADD ACCOUNT")');
    await page.waitForSelector('.newAccount_account_list_inner_div__6KU_N:has-text("Bank")');
    await page.click('.newAccount_account_list_inner_div__6KU_N:has-text("Bank")');
    //await safelyPerformAction(page,'click', `.selectAccount_bank_list_inner_div__KEaAY p:has-text("Askari Bank")`);
    //await page.getByText('Askari Bank"').click();
    await page.waitForSelector('p:has-text("Askari Bank")')
    await page.click('p:has-text("Askari Bank")');

// Find the input field with the placeholder "Add Account Title" and fill it with the updated bank name
    await page.waitForSelector('input[placeholder="Add Account Title"]');
    await page.fill('input[placeholder="Add Account Title"]', 'Askari Bank Murtuzass');

    //await page.getByPlaceholder('Add Account Title').fill('Askari Bank Murtuz');
    //await waitForSelector(page,'fill', 'input[name="accountNumber"]', '1010');
    await page.fill('input[name="accountNumber"]', '1010');
    //await page.fill('//*[@id="__next"]/div[1]/div[1]/form/div/div[1]/div[3]/div/input', 555);
    await page.waitForSelector('input[placeholder="0"]');
    await page.fill('input[placeholder="0"]', '15000');
    //await waitForSelector(page,'click', 'button.addBankAccount_add_account_btn__9yXE9');
    await page.waitForSelector('button.addBankAccount_add_account_btn__9yXE9');
    await page.click('button.addBankAccount_add_account_btn__9yXE9');
    //await waitForElement(page,`.HKAccountListing_ListItemWithBg__MKYfQ:has-text("Askari Bank")`);
    //await waitForElement(page, '.HKAccountListing_ListItemWithBg__MKYfQ:has-text("Askari Bank Murtuza1")');
    console.log('2nd The test for adding a Bank Account has been successfully passed.');

    //await page.goto('http://35.208.67.169:3008/accounts');

    // Check if the bank name appears in the account list
    const isBankAdded = await page.evaluate(() => {
        // Modify the selector to match the bank name element in the account list
        const bankNameElement = document.querySelector('.HKAccountListing_ListItemWithBg__MKYfQ');
        // If the bank name element is found, return true; otherwise, return false
        return bankNameElement !== null;
    });

    // Assert if the bank name is added successfully
    if (isBankAdded) {
        console.log('Bank name added successfully!');
    } else {
        console.log('Bank name not found.');
    }
});

test('Verify Account Adding Person', async ({ }) => {
    await clickViewAllButton(page);
    await safelyPerformAction(page,'click', 'button:has-text("ADD ACCOUNT")');
    await safelyPerformAction(page,'click', '.newAccount_account_list_inner_div__6KU_N:has-text("Person")');
    await safelyPerformAction(page,'fill', 'input[name="title"]', 'Pakki');
    await safelyPerformAction(page,'fill', 'input[name="accountBalance"]', '75000');
    await safelyPerformAction(page,'click', 'button.personAccount_add_person_btn__GHonT');
    console.log('3rd The test for adding a Person Account has been successfully passed.');
});
//Transactions
test('Quick Add Transactions--> Add Expense', async ({ }) => {
    await page.waitForSelector('.HKRoundedCornerButton_HK-RoundedButton-main__iNcDp');
    await safelyPerformAction(page, 'click', '.HKRoundedCornerButton_HK-RoundedButton-main__iNcDp');

    await page.waitForSelector('.vouchers_input_main_div__me793');
    await safelyPerformAction(page, 'click', '.vouchers_input_main_div__me793');

    const buttonSelector=page.locator('input[type="button"][value="1"]');
    await expect(buttonSelector).toBeVisible();
    await buttonSelector.click();
    
    await page.waitForSelector('.HKSavingCategoryItem_HKCategory-item__CSaI6');
    await safelyPerformAction(page, 'click', '.HKSavingCategoryItem_HKCategory-item__CSaI6');

    await page.waitForSelector('.HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF');
    await safelyPerformAction(page, 'click', '.HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF');

    await safelyPerformAction(page, 'fill', 'div.vouchers_rootDiv__xGq3_ input[name="startDate"]', 'December 11, 2023');

    await page.waitForSelector('.vouchers_accountSelection_main_div__AS45r');
    await safelyPerformAction(page, 'click', '.vouchers_accountSelection_main_div__AS45r');

    await page.waitForSelector('button:has-text("Save")');
    await safelyPerformAction(page, 'click', 'button:has-text("Save")');

    console.log('The test for Verify Add Expense successfully passed.');

});

test('Quick Add Transactions--> Add Income', async ({ }) => {
    await page.waitForSelector('.HKRoundedCornerButton_HK-RoundedButton-title__diMAE:has-text("Add Income")');
    await safelyPerformAction(page, 'click', '.HKRoundedCornerButton_HK-RoundedButton-title__diMAE:has-text("Add Income")');

    await page.waitForSelector('.HKVoucherButton_button_withOutBorder__93580:has-text("Income")');
    await safelyPerformAction(page, 'click', '.HKVoucherButton_button_withOutBorder__93580:has-text("Income")');

    await page.waitForSelector('.income_voucherButton__Q9oaQ');
    await safelyPerformAction(page, 'click', '.income_input_main_div__x1YCt');

    // const buttonSelector=page.locator('input[type="button"][value="1"]');
    // await expect(buttonSelector).toBeVisible();
    // await buttonSelector.click();
    const buttonSelector = page.locator('input[type="button"][value="1"]');
await expect(buttonSelector).toBeVisible();

for (let i = 0; i < 3; i++) {
    await buttonSelector.click();
}

    await page.waitForSelector('.HKSavingCategoryItem_HKCategory-item__CSaI6');
    await safelyPerformAction(page, 'click', '.HKSavingCategoryItem_HKCategory-item__CSaI6');

    await page.waitForSelector('.HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF');
    await safelyPerformAction(page, 'click', '.HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF');

    // await page.waitForSelector('.income_rootDiv__rpv_x');
    // await safelyPerformAction(page, 'click', '.income_rootDiv__rpv_x');

    // await safelyPerformAction(page, 'click', '.undefined HKCalendar_today__lryHR');

    //await safelyPerformAction(page, 'fill', 'div.income_rootDiv__rpv_x input[name="startDate"]', 'December 11, 2023');
    // const calendarSelector = 'table.HKCalendar_table__As0jF';
    // const dayToClick = '12';

    // Click on the input field to trigger the calendar
    //await safelyPerformAction(page, 'click', calendarSelector);

    await safelyPerformAction(page, 'click', 'div.income_rootDiv__rpv_x input[name="startDate"]');
    const dayToClick = '12';
    // Click on the 12th of December
    const daySelector = `td:not(.HKCalendar_in-prev-month___jTM_):not(.HKCalendar_in-next-month__hiU_4):not(.undefined):contains("${dayToClick}")`;
    //await page.waitForSelector(daySelector);
    //await page.waitForSelector(daySelector);
    await safelyPerformAction(page, 'click', daySelector);

     await page.waitForSelector('.HKButton_mainButton-title__zbbhe:has-text("Apply")');
     await safelyPerformAction(page, 'click', '.HKButton_mainButton-title__zbbhe:has-text("Apply")');

    await page.waitForSelector('button:has-text("Save")');
    await safelyPerformAction(page, 'click', 'button:has-text("Save")');

    console.log('The test for Verify Add income successfully passed.');

});
/*
test('Budget', async ({ }) => {
  await page.locator('.dashboard_othersSec__xZDhj > div > .QuickAddTransactionGroup_quick-add-transaction-items__ZpTT6 > div:nth-child(2) > .HKRoundedCornerButton_HK-RoundedButton-main__iNcDp > .HKRoundedCornerButton_HK-RoundedButton__5thQz').click();
  await page.getByRole('button', { name: 'plus_icon_image ADD BUDGET' }).click();
  await page.getByPlaceholder('0').click();
  await page.getByPlaceholder('0').fill('1,1011');
  await page.locator('div').filter({ hasText: /^Personal$/ }).getByRole('img').click();
  await page.getByRole('img', { name: 'toggle_switch' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
    console.log('The test for adding a Budget has been successfully created.');
});*/
test('Quick Add Transactions--> Add Transfer', async ({}) => {
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

test('Floating Action Button Expense', async ({}) => {

    const button = await page.$('.FloatingActionButton_mainFAButton__bL42r')
    button.click();
    await page.getByPlaceholder('0').click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '0' }).click({clickCount: 3});
    //await page.getByText('Food & Drink').click();
    //await page.waitForSelector('p:has-text("Food & Drink")')
    await page.click('p:has-text("Food & Drink")');
    const bankImages = await page.$$('.HKAccountsSelectionItem_icon-fab-area-account__rSs6f img');
    const clickableIndex = bankImages.findIndex(async img => {
        const rect = await img.boundingBox();
        return rect && rect.x >= 0 && rect.y >= 0;
    });
    if (clickableIndex >= 0) {
        await bankImages[clickableIndex].click();
        console.log(`Clicked on the ${clickableIndex === 0 ? 'first' : 'second'} bank image`);
    } else {
        console.log('No clickable bank images found');
    }
    await page.waitForSelector('text="Yesterday"');
    await page.click('text="Yesterday"');

    await page.waitForSelector('button:has-text("Save")');
    await page.click('button:has-text("Save")');
    console.log('4th The test for Verify Add Expense successfully passed.');

    }, { timeout: 60000 });


test('Floating Action Button Income', async ({ }) => {

    // Increase the default timeout for the page
    page.setDefaultTimeout(60000); // Set timeout to 60 seconds

    // Wait for the FloatingActionButton to be visible and clickable
await page.waitForSelector('.FloatingActionButton_mainFAButton__bL42r');

// Find the FloatingActionButton element
const button = await page.$('.FloatingActionButton_mainFAButton__bL42r');

// Click on the FloatingActionButton if found
if (button) {
    await button.click();
} else {
    console.error('FloatingActionButton not found');
}

    await page.waitForSelector('button:has-text("Income")', { timeout: 10000 }); // Increase timeout to 10 seconds
    await page.click('button:has-text("Income")');

    await page.waitForSelector('input[placeholder="0"]');
    await page.click('input[placeholder="0"]');

    await page.waitForSelector('input[value="1"]');
    await page.click('input[value="1"]');

    await page.waitForSelector('input[value="0"]');
    await page.click('input[value="0"]',{ clickCount: 3});

    await page.waitForSelector('p:has-text("Bonus")');
    await page.click('p:has-text("Bonus")');

    const bankImages = await page.$$('.HKAccountsSelectionItem_icon-fab-area-account__rSs6f img');
    const clickableIndex = bankImages.findIndex(async img => {
        const rect = await img.boundingBox();
        return rect && rect.x >= 0 && rect.y >= 0;
    });
    if (clickableIndex >= 0) {
        await bankImages[clickableIndex].click();
        console.log(`Clicked on the ${clickableIndex === 0 ? 'first' : 'second'} bank image`);
    } else {
        console.log('No clickable bank images found');
    }

    // Wait for the element with text "Yesterday" to appear
    await page.waitForSelector('text="Yesterday"');
    await page.click('text="Yesterday"');

    await page.waitForSelector('button:has-text("Save")');
    await page.click('button:has-text("Save")');

    console.log('The test for Verify Add income successfully passed.');

}, { timeout: 120000 }); // Adjusting the overall test timeout to 120 seconds
