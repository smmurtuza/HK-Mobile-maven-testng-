const { expect } = require('@playwright/test');
// const { safelyPerformAction } = require('./pageActions');
// const { waitForElement } = require('./elementUtils');
//const { clickViewAllButton } = require('./navigationActions');

// async function clickViewAllButton(page) {
//     try {
//         await waitForElement(page, '.YourAccounts_your-accounts-actionButtons__p_1YK p:has-text("View All")', { type: 'visible', timeout: 10000 });
//         //await waitForElement(page,'.YourAccounts_your-accounts-actionButtons__p_1YK p:has-text("View All")');
//         await safelyPerformAction(page,'click','.YourAccounts_your-accounts-actionButtons__p_1YK p:has-text("View All")');
//         console.log('Clicked on the "View All" button successfully.');
//     } catch (error) {
//         console.error('Error clicking on the "View All" button:', error);
//     }

// }

//const clickViewAllButton = async (page) => {
    async function clickViewAllButton(page) {
    try {
        const viewAllButton = page.locator('.YourAccounts_your-accounts-actionButtons__p_1YK p:has-text("View All")');
        await expect(viewAllButton).toBeVisible();
        await viewAllButton.click();
        console.log('Clicked on the "View All" button successfully.');
    } catch (error) {
        console.error('Error clicking on the "View All" button:', error);
    }
};
module.exports = { clickViewAllButton };