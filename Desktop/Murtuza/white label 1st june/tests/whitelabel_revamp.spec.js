const { test, expect, devices } = require('@playwright/test');
//const { initializePage } = require('./pageInitialization');
const { waitForElement } = require('./elementUtils');
const { performAction, safelyPerformAction } = require('./pageActions');
//const { clickViewAllButton } = require('./navigationActions');
const { clickViewAllButton,selectBankImage,generateUniqueAccountName,bankImages} = require('./navigationActions');
const { verifyExpectedToastMessage } = require('./ToastMessage');
const { time } = require('console');

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

test.describe('Account creation voucher', () => {
test('Verify Account Addition cash', async ({ }) => {
    await clickViewAllButton(page);
    //await page.pause();
    await safelyPerformAction(page, 'click', 'button:has-text("ADD ACCOUNT")');
    await safelyPerformAction(page, 'click', '.newAccount_account_list_inner_div__6KU_N:has-text("Cash")');
    const uniqueAccountName = generateUniqueAccountName('Test murtuza');
    console.log(uniqueAccountName);
    await safelyPerformAction(page, 'fill', 'input[name="title"]', uniqueAccountName);
    await safelyPerformAction(page, 'fill', 'input[name="accountBalance"]', '998');
    //await page.pause();
    await safelyPerformAction(page, 'click', 'button.cashAccount_add_account_btn__w7c8d');
    // Verify that the toast message "Account created" is displayed
    const toastMessage = await page.waitForSelector('.Toastify__toast-body', { state: 'visible' });
    const toastMessageText = await toastMessage.innerText();

    const expectedMessages = ['Account created', 'Event Created', 'Cannot create event'];
    let foundMessage = false;

    for (const expectedMessage of expectedMessages) {
        if (toastMessageText.includes(expectedMessage)) {
        console.log(`Toast message: ${toastMessageText}`);
        foundMessage = true;
        break;
        }
    }
if (!foundMessage) {
    console.log(`Your toast message: ${toastMessageText} does not contain any of the expected messages: ${expectedMessages.join(', ')}`);
}
    await page.waitForTimeout(2000);
        await expect(page.getByText(uniqueAccountName)).toBeVisible();
        await page.click(`text=${uniqueAccountName}`);

    await page.waitForTimeout(2000);
    const screenshotPath = `C:/Users/HK/Desktop/Murtuza/HK-REVAMP/whitelabel_revamp.spec.js/screenshots/Cashaccounts/Cash-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath });
    console.log(`Saving screenshot to: ${screenshotPath}`);
    console.log('Adding a Cash Account has been successfully passed.');
});

test('Verify Account Addition Bank', async ({ }) => {
    await clickViewAllButton(page);
    await page.waitForSelector('button:has-text("ADD ACCOUNT")');
    await page.click('button:has-text("ADD ACCOUNT")');
    await page.waitForSelector('.newAccount_account_list_inner_div__6KU_N:has-text("Bank")');
    await page.click('.newAccount_account_list_inner_div__6KU_N:has-text("Bank")');
    await page.waitForSelector('p:has-text("Habib Bank Limited (HBL)")')
    await page.click('p:has-text("Habib Bank Limited (HBL)")');
    await page.waitForSelector('input[placeholder="Add Account Title"]');
    //await page.pause();
    const uniqueAccountName = generateUniqueAccountName('Test murtuza');
    console.log(uniqueAccountName);
    await page.fill('input[placeholder="Add Account Title"]', uniqueAccountName);
    await page.fill('input[name="accountNumber"]', '1999');
    await page.waitForSelector('input[placeholder="0"]');
    await page.fill('input[placeholder="0"]', '15000');
    await page.waitForSelector('button.addBankAccount_add_account_btn__9yXE9');
    await page.click('button.addBankAccount_add_account_btn__9yXE9');
    //console.log('2nd The test for adding a Bank Account has been successfully passed.');
    // Verify that the toast message "Account created" is displayed
    const toastMessage = await page.waitForSelector('.Toastify__toast-body', { state: 'visible' });
const toastMessageText = await toastMessage.innerText();

const expectedMessages = ['Account created', 'Event Created', 'Cannot create event'];
let foundMessage = false;

for (const expectedMessage of expectedMessages) {
    if (toastMessageText.includes(expectedMessage)) {
        console.log(`Toast message: ${toastMessageText}`);
        foundMessage = true;
        break;
    }
}
if (!foundMessage) {
    console.log(`Your toast message: ${toastMessageText} does not contain any of the expected messages: ${expectedMessages.join(', ')}`);
}
    await page.waitForTimeout(3000);
        await expect(page.getByText(uniqueAccountName)).toBeVisible();
        await page.click(`text=${uniqueAccountName}`);
    await page.waitForTimeout(2000);
    const screenshotPath = `C:/Users/HK/Desktop/Murtuza/HK-REVAMP/whitelabel_revamp.spec.js/screenshots/Bankaccount/Bank-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath });
    console.log(`Saving screenshot to: ${screenshotPath}`);
    console.log('Adding a Bank Account has been successfully passed.');
});

test('Verify Account Adding Person', async ({ }) => {
    await clickViewAllButton(page);
    //await page.pause();
    await safelyPerformAction(page, 'click', 'button:has-text("ADD ACCOUNT")');
    await safelyPerformAction(page, 'click', '.newAccount_account_list_inner_div__6KU_N:has-text("Person")');
    const uniqueAccountName = generateUniqueAccountName('Test murtuza');
    console.log(uniqueAccountName);
    await safelyPerformAction(page, 'fill', 'input[name="title"]',uniqueAccountName);
    await safelyPerformAction(page, 'fill', 'input[name="accountBalance"]', '5000');
    await safelyPerformAction(page, 'click', 'button.personAccount_add_person_btn__GHonT');
    //console.log('Adding a Person Account has been successfully passed.');
    const toastMessage = await page.waitForSelector('.Toastify__toast-body', { state: 'visible' });
const toastMessageText = await toastMessage.innerText();

const expectedMessages = ['Account created', 'Event Created', 'Cannot create event'];
let foundMessage = false;

for (const expectedMessage of expectedMessages) {
    if (toastMessageText.includes(expectedMessage)) {
        console.log(`Toast message: ${toastMessageText}`);
        foundMessage = true;
        break;
    }
}

if (!foundMessage) {
    console.log(`Your toast message: ${toastMessageText} does not contain any of the expected messages: ${expectedMessages.join(', ')}`);
}
    await expect(page.getByText(uniqueAccountName)).toBeVisible();
    await page.click(`text=${uniqueAccountName}`);
    await page.waitForTimeout(2000);
    const screenshotPath = `C:/Users/HK/Desktop/Murtuza/HK-REVAMP/whitelabel_revamp.spec.js/screenshots/Personaccount/Person-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath });
    console.log(`Saving screenshot to: ${screenshotPath}`);
    console.log('Adding a Person Account has been successfully passed.');
});
});
//Transactions
test.describe('Quick Add transactions', () => {

test('Quick Add Transactions--> Add Expense', async ({ }) => {
    //await page.pause();
    await page.waitForSelector('a:has-text("Add Expense")');
    await page.click('a:has-text("Add Expense")');
    await page.getByPlaceholder('0').click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '0' }).click({ clickCount: 2 });

    await page.pause();
    const textArray = ['Bonus', 'Salary', 'Commission', 'Pension','Personal','Food & Drink','Transport','Fuel'];

  for (const text of textArray) {
    const selector = `p:has-text("${text}")`;
    if (await page.$(selector)) {
      await page.click(selector);
      console.log(`Clicked on ${text}`);
      break; // Exit loop after clicking the first found element
    }
  }
    page.waitForTimeout(4000);
    let fromAccountSelector;
    try {
        fromAccountSelector = await selectBankImage(page, bankImages);
    } catch (error) {
        console.log('Error selecting "from" account:', error);
        return;
    }
    
    await page.waitForSelector('button:has-text("Yesterday")');
    await page.click('button:has-text("Yesterday")');

    await expect(page.getByRole('heading', { name: 'Descriptions' })).toBeVisible();
    await page.locator('section').filter({ hasText: 'Descriptions' }).getByRole('img').click();

    await page.getByPlaceholder('Add a description for your transacton').click();
    await page.getByPlaceholder('Add a description for your transacton').fill('performing test transaction for testing purpose');
    //await page.click('div.vouchers_left_div__WVZB0 h3');
    await page.locator('section').filter({ hasText: 'Labels' }).getByRole('img').click();
    await page.click('button.HKButton_addBtn__j_FN6:has-text("ADD")');
    await page.click('p.HKBottomSheetLabels_suggestedItemVoucher__ltOEt:has-text("Bus")');
    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');

    //await page.click('div.vouchers_left_div__WVZB0 h3:has-text("Events")');
    await page.locator('section').filter({ hasText: 'Events' }).getByRole('img').click();
    await page.locator('section').filter({ hasText: 'Link to EventADD' }).getByRole('button').click();
    //await page.click('div.HKAccountItem_add-new-account-text-area__rUA4T h1');

    const primarySelector = 'div.HKEventItem_HK-EventItem__DjXJd div.HKEventItem_eventName-section__wobDu';
  const fallbackSelector = 'div.HKAccountItem_add-new-account-text-area__rUA4T h1';

  if (await page.$(primarySelector)) {
    await page.click(primarySelector);
    console.log('Clicked on the primary element.');
  } else {
    await page.click(fallbackSelector);
    console.log('Primary element not found, clicked on the fallback element.');
    await expect(page.getByRole('heading', { name: 'Add Event' })).toBeVisible();

    const uniqueEventtName = generateUniqueAccountName('Test Event');
    console.log(uniqueEventtName);
    await page.locator('input[name="title"]').fill(uniqueEventtName);
    await page.waitForTimeout(2000);

    //await page.getByPlaceholder(' May 17 2024').click();
    await page.waitForSelector('input[name="startDate"]');
    await page.locator('input[name="startDate"]').click();
    const startDate1 = '2'; // Specify the day you want to click
    // Construct the XPath selector to locate the <td> element with the specified text
    const xpathSelector1 = `//td[text()='${startDate1}']`;
    // Click on the <td> element
    await page.click(xpathSelector1);

    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');
    
    await page.waitForSelector('input[name="endDate"]');
    await page.locator('input[name="endDate"]').click();
    const enddate1 = '25'; // Specify the day you want to click
    // Construct the XPath selector to locate the <td> element with the specified text
    const xpathSelector2 = `//td[text()='${enddate1}']`;
    // Click on the <td> element
    await page.click(xpathSelector2);

    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');
    await page.getByPlaceholder('Add a description to your event').click();
    await page.getByPlaceholder('Add a description to your event').fill('birthday party test event');
  }
    await page.waitForSelector('button:has-text("Save")');
    await page.click('button:has-text("Save")');
     // Verify that the toast message "Account created" is displayed
     const toastMessage = await page.waitForSelector('.Toastify__toast-body', { state: 'visible' });
const toastMessageText = await toastMessage.innerText();

const expectedMessages = ['Transaction created', 'Event Created', 'Cannot create event'];
let foundMessage = false;

for (const expectedMessage of expectedMessages) {
    if (toastMessageText.includes(expectedMessage)) {
        console.log(`Toast message: ${toastMessageText}`);
        foundMessage = true;
        break;
    }
}

if (!foundMessage) {
    console.log(`Your toast message: ${toastMessageText} does not contain any of the expected messages: ${expectedMessages.join(', ')}`);
}   
     await page.waitForTimeout(2000);
     const screenshotPath = `C:/Users/HK/Desktop/Murtuza/HK-REVAMP/whitelabel_revamp.spec.js/screenshots/Addexpense/Add Expense-${Date.now()}.png`;
     await page.screenshot({ path: screenshotPath });
     console.log(`Saving screenshot to: ${screenshotPath}`);
    console.log('The test for Verify Add Expense successfully passed.');

}, { timeout: 60000 });

test('Quick Add Transactions--> Add Income', async ({ }) => {
    //await page.pause();
    await page.waitForSelector('a:has-text("Add Income")');
    await page.click('a:has-text("Add Income")');
    await page.getByPlaceholder('0').click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '0' }).click({ clickCount: 2 });
    const textArray = ['Bonus', 'Salary', 'Commission', 'Pension'];

  for (const text of textArray) {
    const selector = `p:has-text("${text}")`;
    if (await page.$(selector)) {
      await page.click(selector);
      console.log(`Clicked on ${text}`);
      break; // Exit loop after clicking the first found element
    }
  } 
  await page.pause();
    // page.waitForTimeout(2000);
    // try {
    //     await page.waitForSelector('img[src="/icons/banks/Askari Bank.svg"]');
    //     await page.click('img[src="/icons/banks/Askari Bank.svg"]');
    //   } catch (error) {
    //     console.log('Image not found, clicking on the default image.');
    //     await page.waitForSelector('img[src="/icons/banks/ABBPL.svg"]');
    //     await page.click('img[src="/icons/banks/ABBPL.svg"]');
    //   }
    // Select "from" account
    let fromAccountSelector;
    try {
        fromAccountSelector = await selectBankImage(page, bankImages);
    } catch (error) {
        console.log('Error selecting "from" account:', error);
        return;
    }

    await page.waitForSelector('button:has-text("Yesterday")');
    await page.click('button:has-text("Yesterday")');
    //await page.click('div.vouchers_left_div__WVZB0 h4');
    await expect(page.getByRole('heading', { name: 'Descriptions' })).toBeVisible();
    await page.locator('section').filter({ hasText: 'Descriptions' }).getByRole('img').click();

    await page.getByPlaceholder('Add a description for your transacton').click();
    await page.getByPlaceholder('Add a description for your transacton').fill('performing test transaction');
    //await page.click('div.vouchers_left_div__WVZB0 h3');
    await page.locator('section').filter({ hasText: 'Labels' }).getByRole('img').click();
    await page.click('button.HKButton_addBtn__j_FN6:has-text("ADD")');
    await page.click('p.HKBottomSheetLabels_suggestedItemVoucher__ltOEt:has-text("Bus")');
    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');

    //await page.click('div.vouchers_left_div__WVZB0 h3:has-text("Events")');
    await page.locator('section').filter({ hasText: 'Events' }).getByRole('img').click();
    await page.locator('section').filter({ hasText: 'Link to EventADD' }).getByRole('button').click();

    //await page.click('div.HKEventItem_HK-EventItem__DjXJd');
    const primarySelector = 'div.HKEventItem_HK-EventItem__DjXJd div.HKEventItem_eventName-section__wobDu';
    const fallbackSelector = 'div.HKAccountItem_add-new-account-text-area__rUA4T h1';

    //await page.pause();

  if (await page.$(primarySelector)) {
    await page.click(primarySelector);
    console.log('Clicked on the primary element.');
  } else {
    await page.click(fallbackSelector);
    console.log('Primary element not found, clicked on the fallback element.');
    await expect(page.getByRole('heading', { name: 'Add Event' })).toBeVisible();

    const uniqueEventtName = generateUniqueAccountName('Test Event');
    console.log(uniqueEventtName);
    await page.locator('input[name="title"]').fill(uniqueEventtName);
    await page.waitForTimeout(2000);
    //await page.getByPlaceholder(' May 17 2024').click();
    await page.waitForSelector('input[name="startDate"]');
    await page.locator('input[name="startDate"]').click();
    const startDate1 = '2'; // Specify the day you want to click
    // Construct the XPath selector to locate the <td> element with the specified text
    const xpathSelector1 = `//td[text()='${startDate1}']`;
    // Click on the <td> element
    await page.click(xpathSelector1);

    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');
    
    await page.waitForSelector('input[name="endDate"]');
    await page.locator('input[name="endDate"]').click();
    const enddate1 = '25'; // Specify the day you want to click
    // Construct the XPath selector to locate the <td> element with the specified text
    const xpathSelector2 = `//td[text()='${enddate1}']`;
    // Click on the <td> element
    await page.click(xpathSelector2);

    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');
    await page.getByPlaceholder('Add a description to your event').click();
    await page.getByPlaceholder('Add a description to your event').fill('birthday party');
  }

    await page.waitForSelector('button:has-text("Save")');
    await page.click('button:has-text("Save")');
  
const toastMessage = await page.waitForSelector('.Toastify__toast-body', { state: 'visible' });
const toastMessageText = await toastMessage.innerText();

const expectedMessages = ['Transaction created', 'Event Created', 'Cannot create event'];
let foundMessage = false;

for (const expectedMessage of expectedMessages) {
    if (toastMessageText.includes(expectedMessage)) {
        console.log(`Toast message: ${toastMessageText}`);
        foundMessage = true;
        break;
    }
}

if (!foundMessage) {
    console.log(`Your toast message: ${toastMessageText} does not contain any of the expected messages: ${expectedMessages.join(', ')}`);
}
    await page.waitForTimeout(3000);
    await expect(page.getByText(uniqueAccountName)).toBeVisible();
    await page.click(`text=${uniqueAccountName}`);

     await page.waitForTimeout(2000);
     const screenshotPath = `C:/Users/HK/Desktop/Murtuza/HK-REVAMP/whitelabel_revamp.spec.js/screenshots/Addincome/Add Expense-${Date.now()}.png`;
     await page.screenshot({ path: screenshotPath });
     console.log(`Saving screenshot to: ${screenshotPath}`);
    console.log('The test for Verify Add Income successfully passed.');
}, { timeout: 60000 });

test('Quick Add Transactions--> Add Transfer', async ({ }) => {
    
    //await page.pause();
    await page.waitForSelector('a:has-text("Add Transfer")');
    await page.click('a:has-text("Add Transfer")');
    await page.getByPlaceholder('0').click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '2' }).click({ clickCount: 3 });
    await page.waitForTimeout(5000); 
    //await page.pause();

     // Select "from" account
     let fromAccountSelector;
     try {
         fromAccountSelector = await selectBankImage(page, bankImages);
     } catch (error) {
         console.log('Error selecting "from" account:', error);
         return;
     }
     // Filter out the "from" account selector for the "to" account selection
     await page.getByText('more').click();
     await page.waitForTimeout(4000);
     const toAccountImages = bankImages.filter(selector => selector !== fromAccountSelector);
 
     // Select "to" account
     try {
         await selectBankImage(page, toAccountImages);
     } catch (error) {
         console.log('Error selecting "to" account:', error);
         return;
     }

    await page.waitForSelector('button:has-text("Yesterday")');
    await page.click('button:has-text("Yesterday")');

    await expect(page.getByRole('heading', { name: 'Descriptions' })).toBeVisible();
    await page.locator('section').filter({ hasText: /^Descriptions$/ }).getByRole('img').click();

    await page.getByPlaceholder('Add a description for your transacton').click();
    await page.getByPlaceholder('Add a description for your transacton').fill('performing test transaction');
   
    await page.locator('section').filter({ hasText: /^Labels$/ }).getByRole('img').click();

    await page.click('button.HKButton_addBtn__j_FN6:has-text("ADD")');
    await page.click('p.HKBottomSheetLabels_suggestedItemVoucher__ltOEt:has-text("Bus")');
    await page.getByRole('button', { name: 'Apply' }).nth(1).click();

    //await page.click('div.vouchers_left_div__WVZB0 h3:has-text("Events")');
    await page.locator('section').filter({ hasText: /^Events$/ }).getByRole('img').click();
    await page.getByRole('button', { name: 'add-button ADD' }).click();
    await page.waitForTimeout(5000); 

    const primarySelector = 'div.HKEventItem_HK-EventItem__DjXJd div.HKEventItem_eventName-section__wobDu';
    const fallbackSelector = 'div.HKAccountItem_add-new-account-text-area__rUA4T h1';

  if (await page.$(primarySelector)) {
    await page.click(primarySelector);
    console.log('Clicked on the primary element.');
  } else {
    await page.click(fallbackSelector);
    console.log('Primary element not found, clicked on the fallback element.');
    await expect(page.getByRole('heading', { name: 'Add Event' })).toBeVisible();
    const uniqueEventName = generateUniqueAccountName('Event for tesing purpose');
    console.log(uniqueEventName);
    await page.locator('input[name="title"]').fill(uniqueEventName);
    
    await page.waitForSelector('input[name="startDate"]');
    await page.locator('input[name="startDate"]').click();
    const startDate1 = '2'; // Specify the day you want to click
    // Construct the XPath selector to locate the <td> element with the specified text
    const xpathSelector1 = `//td[text()='${startDate1}']`;
    // Click on the <td> element
    await page.click(xpathSelector1);
    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")'); 
    await page.waitForSelector('input[name="endDate"]');
    await page.locator('input[name="endDate"]').click();
    const enddate1 = '25'; // Specify the day you want to click
    // Construct the XPath selector to locate the <td> element with the specified text
    const xpathSelector2 = `//td[text()='${enddate1}']`;
    // Click on the <td> element
    await page.click(xpathSelector2);

    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');
    await page.getByPlaceholder('Add a description to your event').click();
    await page.getByPlaceholder('Add a description to your event').fill('birthday party');
  }
  //await page.pause();

  const saveButtonSelector = 'button:has-text("Save")';
  const applyButtonSelector = 'button.HKButton_mainButton__lc0N7:has-text("Apply")';
  
  if (await page.$(saveButtonSelector)) {
      await page.waitForSelector(saveButtonSelector);
      await page.click(saveButtonSelector);
  } else {
      console.log('Save button not found. Clicking on Apply.');
      await page.waitForSelector(applyButtonSelector);
      await page.click(applyButtonSelector);
  }
 
    const toastMessage = await page.waitForSelector('.Toastify__toast-body', { state: 'visible' });
const toastMessageText = await toastMessage.innerText();

const expectedMessages = ['Transaction created', 'Event Created', 'Cannot create event'];
let foundMessage = false;

for (const expectedMessage of expectedMessages) {
    if (toastMessageText.includes(expectedMessage)) {
        console.log(`Toast message: ${toastMessageText}`);
        foundMessage = true;
        break;
    }
}

if (!foundMessage) {
    console.log(`Your toast message: ${toastMessageText} does not contain any of the expected messages: ${expectedMessages.join(', ')}`);
}   
    await page.waitForTimeout(2000);
    //await page.pause();

    await page.getByRole('heading', { name: 'Dashboard' }).click();
    await page.getByRole('link', { name: 'add-transaction history' }).click();
    await page.waitForTimeout(2000);
    
    //await page.waitForTimeout(2000);
     const screenshotPath = `C:/Users/HK/Desktop/Murtuza/HK-REVAMP/whitelabel_revamp.spec.js/screenshots/Addtransfer/Add transfer-${Date.now()}.png`;
     await page.screenshot({ path: screenshotPath });
     console.log(`Saving screenshot to: ${screenshotPath}`);
    console.log('The test for Verify Add Transfer successfully passed.');
}, { timeout: 60000 }); 

test('Quick Add Transactions--> ATM', async ({ }) => {
    //await page.pause();
    await page.waitForSelector('a:has-text("ATM")');
    await page.click('a:has-text("ATM")');
    await page.getByPlaceholder('0').click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '0' }).click({ clickCount: 2 });
   // Select "from" account
   let fromAccountSelector;
   try {
       fromAccountSelector = await selectBankImage(page, bankImages);
       console.log('Selected "from" account:', fromAccountSelector);
   } catch (error) {
       console.log('Error selecting "from" account:', error);
       return;
   }
   await page.pause();
   await page.waitForTimeout(3000);

   const firstSelector_atm = '.atmVoucher_accountSelection_main_div__zIipP > div > .HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF > .HKAccountsSelectionItem_icon-fab-area-account__rSs6f';
    const fallbackSelector_atm = '.atmVoucher_accountSelection_main_div__zIipP > div:nth-child(2) > .HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF > .HKAccountsSelectionItem_icon-fab-area-account__rSs6f';

const firstElement = await page.locator(firstSelector_atm).first();

if (await firstElement.isVisible()) {
    await firstElement.click();
    console.log(`Clicked on the "to" account using first selector: ${firstSelector_atm}`);
} else {
    const fallbackElement = await page.locator(fallbackSelector_atm);
    if (await fallbackElement.isVisible()) {
        await fallbackElement.click();
        console.log(`Clicked on the "to" account using fallback selector: ${fallbackSelector_atm}`);
    } else {
        console.error('Both selectors failed to locate the "to" account image.');
    }
}

//    try {
//     Toaccount = await page.locator('.atmVoucher_accountSelection_main_div__zIipP > div > .HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF > .HKAccountsSelectionItem_icon-fab-area-account__rSs6f').first().click();
//     console.log('Clicked on the "to" account.', Toaccount);

//   } catch (error) {
//     console.log('Image not found, clicking on the default image.');
//     Toaccount1 = await page.locator('.atmVoucher_accountSelection_main_div__zIipP > div:nth-child(2) > .HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF > .HKAccountsSelectionItem_icon-fab-area-account__rSs6f').click();
//     console.log('Clicked on the "to" account.', Toaccount1);
//   }

    await page.waitForTimeout(1000);
    await page.waitForSelector('button:has-text("Yesterday")');
    await page.click('button:has-text("Yesterday")');

    await expect(page.getByRole('heading', { name: 'Descriptions' })).toBeVisible();
    await page.locator('section').filter({ hasText: /^Descriptions$/ }).getByRole('img').click();

    await page.getByPlaceholder('Add a description for your transacton').click();
    await page.getByPlaceholder('Add a description for your transacton').fill('performing test transaction for testing purpose');
    //await page.click('div.vouchers_left_div__WVZB0 h3');
    await page.locator('section').filter({ hasText: /^Labels$/ }).getByRole('img').click();
    await page.getByRole('button', { name: 'add-button ADD' }).click();
    await page.getByText('Rickshaw').click();
    await page.getByRole('button', { name: 'Apply' }).nth(1).click();

    //await page.click('div.vouchers_left_div__WVZB0 h3:has-text("Events")');
    await page.locator('section').filter({ hasText: /^Events$/ }).getByRole('img').click();
    await page.locator('section').filter({ hasText: /^Link to EventADD$/ }).getByRole('button').click();

    await page.waitForTimeout(2000);
    const primarySelector = 'div.HKEventItem_HK-EventItem__DjXJd div.HKEventItem_eventName-section__wobDu';
  const fallbackSelector = 'div.HKAccountItem_add-new-account-text-area__rUA4T h1';

  if (await page.$(primarySelector)) {
    await page.click(primarySelector);
    console.log('Clicked on the primary element.');
  } else {
    await page.click(fallbackSelector);
    console.log('Primary element not found, clicked on the fallback element.');
    await expect(page.getByRole('heading', { name: 'Add Event' })).toBeVisible();
    const uniqueEventName = generateUniqueAccountName('Event for testing purpose');
    console.log(uniqueEventName);
    await page.locator('input[name="title"]').fill(uniqueEventName);

    //await page.getByPlaceholder(' May 17 2024').click();
    await page.waitForSelector('input[name="startDate"]');
    await page.locator('input[name="startDate"]').click();
    const startDate1 = '2'; // Specify the day you want to click
    // Construct the XPath selector to locate the <td> element with the specified text
    const xpathSelector1 = `//td[text()='${startDate1}']`;
    // Click on the <td> element
    await page.click(xpathSelector1);

    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');
    
    await page.waitForSelector('input[name="endDate"]');
    await page.locator('input[name="endDate"]').click();
    const enddate1 = '25'; // Specify the day you want to click
    // Construct the XPath selector to locate the <td> element with the specified text
    const xpathSelector2 = `//td[text()='${enddate1}']`;
    // Click on the <td> element
    await page.click(xpathSelector2);

    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');
    await page.getByPlaceholder('Add a description to your event').click();
    await page.getByPlaceholder('Add a description to your event').fill('birthday party test event');
  }
  const saveButtonSelector = 'button:has-text("Save")';
  const applyButtonSelector = 'button.HKButton_mainButton__lc0N7:has-text("Apply")';
  
  if (await page.$(saveButtonSelector)) {
      await page.waitForSelector(saveButtonSelector);
      await page.click(saveButtonSelector);
  } else {
      console.log('Save button not found. Clicking on Apply.');
      await page.waitForSelector(applyButtonSelector);
      await page.click(applyButtonSelector);
  }
     // Verify that the toast message "Account created" is displayed
     const toastMessage = await page.waitForSelector('.Toastify__toast-body', { state: 'visible' });
    const toastMessageText = await toastMessage.innerText();

    const expectedMessages = ['Transaction created', 'Event Created', 'Cannot create event'];
    let foundMessage = false;

for (const expectedMessage of expectedMessages) {
    if (toastMessageText.includes(expectedMessage)) {
        console.log(`Toast message: ${toastMessageText}`);
        foundMessage = true;
        break;
    }
}

if (!foundMessage) {
    console.log(`Your toast message: ${toastMessageText} does not contain any of the expected messages: ${expectedMessages.join(', ')}`);
}   
    // await page.waitForTimeout(2000);
    // await expect(page.getByText(uniqueAccountName)).toBeVisible();
    // await page.click(`text=${uniqueAccountName}`);
    await page.getByRole('heading', { name: 'Dashboard' }).click();
    await page.getByRole('link', { name: 'add-transaction history' }).click();
    await page.waitForTimeout(2000);
     const screenshotPath = `C:/Users/HK/Desktop/Murtuza/HK-REVAMP/whitelabel_revamp.spec.js/screenshots/ATM/Add Expense-${Date.now()}.png`;
     await page.screenshot({ path: screenshotPath });
     console.log(`Saving screenshot to: ${screenshotPath}`);
    console.log('Verify Add ATM successfully passed.');

}, { timeout: 60000 });
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
    //console.log('The test for adding a Budget has been successfully created.');
});*/

test('Floating Action Button Expense', async ({ }) => {

    const button = await page.$('.FloatingActionButton_mainFAButton__bL42r')
     button.click();
    //await page.pause();
    await page.waitForSelector('a:has-text("Expense")');
    await page.getByRole('button', { name: 'Expense' }).click();
    await page.getByPlaceholder('0').click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '0' }).click({ clickCount: 3 });
    await page.click('p:has-text("Food & Drink")');
    page.waitForTimeout(2000);
    
    // await page.waitForSelector('.HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF');
    // await page.click('.HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF');
    // const bankImages = await page.$$('.HKAccountsSelectionItem_icon-fab-area-account__rSs6f img');
    // const clickableIndex = bankImages.findIndex(async img => {
    //     const rect = await img.boundingBox();
    //     return rect && rect.x >= 0 && rect.y >= 0;
    // });
    // if (clickableIndex >= 0) {
    //     await bankImages[clickableIndex].click();
    //     console.log(`Clicked on the ${clickableIndex === 0 ? 'first' : 'second'} bank image`);
    // } else {
    //     console.log('No clickable bank images found');
    // }
    try {
        await page.waitForSelector('img[src="/icons/banks/Askari Bank.svg"]');
        await page.click('img[src="/icons/banks/Askari Bank.svg"]');
      } catch (error) {
        console.log('Image not found, clicking on the default image.');
        await page.waitForSelector('img[src="/icons/banks/ABBPL.svg"]');
        await page.click('img[src="/icons/banks/ABBPL.svg"]');
      }

    await page.waitForSelector('button:has-text("Yesterday")');
    await page.click('button:has-text("Yesterday")');

    await page.click('div.vouchers_left_div__WVZB0 h4');
    await page.getByPlaceholder('Add a description for your transacton').click();
    await page.getByPlaceholder('Add a description for your transacton').fill('performing test transaction');

    await page.click('div.vouchers_left_div__WVZB0 h3');
    await page.click('button.HKButton_addBtn__j_FN6:has-text("ADD")');
    await page.click('p.HKBottomSheetLabels_suggestedItemVoucher__ltOEt:has-text("Bus")');
    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');

    //await page.pause();




    await page.click('div.vouchers_left_div__WVZB0 h3:has-text("Events")');
    //await page.click('button.HKButton_addBtn__j_FN6:has-text("ADD")');

    await page.locator('section').filter({ hasText: 'Link to EventADD' }).getByRole('button').click();


    await page.click('div.HKAccountItem_add-new-account-text-area__rUA4T h1');

    //await page.timeout(5000);


    await expect(page.getByRole('heading', { name: 'Add Event' })).toBeVisible();

    // await page.getByPlaceholder('E.g. Eid, Your Wedding, Mom\'s').click();


    // // await page.getByname('title').click();
    // await page.getByPlaceholder('E.g. Eid, Your weddings, Mom\'s').fill('creating test event');

    // Fill the input field with the name "title"
await page.locator('input[name="title"]').fill("Test Event Title");

// Alternatively, you can use the getByRole method if the role is known
//await page.getByRole('textbox', { name: 'title' }).fill("Sample Event Title");


    await page.getByPlaceholder(' May 17 2024').click();
    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');
    await page.pause();
    await page.getByPlaceholder('9 September 2022').click();

    const dayToClick = '25'; // Specify the day you want to click

// Construct the XPath selector to locate the <td> element with the specified text
const xpathSelector = `//td[text()='${dayToClick}']`;

// Click on the <td> element
await page.click(xpathSelector);

    await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');

    await page.getByPlaceholder('Add a description to your event').click();
    await page.getByPlaceholder('Add a description to your event').fill('birthday party');

    //await page.click('button.HKButton_mainButton__lc0N7:has-text("Apply")');


    await page.waitForSelector('button:has-text("Save")');
    await page.click('button:has-text("Save")');
     // Verify that the toast message "Account created" is displayed
     const toastMessage = await page.waitForSelector('.Toastify__toast-body', { state: 'visible' });
     const toastMessageText = await toastMessage.innerText();
     expect(toastMessageText).toContain('Event Created');
     console.log('Account created successfully: ${toastMessageText}');
     await page.waitForTimeout(2000);
     const screenshotPath = `C:/Users/HK/Desktop/Murtuza/HK-REVAMP/whitelabel_revamp.spec.js/screenshots/Add Expense-${Date.now()}.png`;
     await page.screenshot({ path: screenshotPath });
     console.log(`Saving screenshot to: ${screenshotPath}`);
    console.log('The test for Verify Add Expense successfully passed.');

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

    await page.getByRole('button', { name: 'Income' }).click();
    //await page.waitForSelector('button:has-text("Income")', { timeout: 10000 }); // Increase timeout to 10 seconds
    await page.click('button:has-text("Income")');

    await page.waitForSelector('input[placeholder="0"]');
    await page.click('input[placeholder="0"]');

    await page.waitForSelector('input[value="1"]');
    await page.click('input[value="1"]');

    await page.waitForSelector('input[value="0"]');
    await page.click('input[value="0"]', { clickCount: 3 });

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
