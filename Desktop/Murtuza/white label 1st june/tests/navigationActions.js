const { expect } = require('@playwright/test');

    // Function to generate a unique account name with proper length constraints and only letters
function generateUniqueAccountName(baseName) {
    const uniqueSuffix = Math.random().toString(36).replace(/[^a-zA-Z]/g, '').substring(0, 5);
    let accountName = `${baseName} ${uniqueSuffix}`;

    // Ensure the account name is within the required length
    if (accountName.length < 2) {
        accountName = accountName.padEnd(2, 'x'); // Pad to minimum length
    } else if (accountName.length > 50) {
        accountName = accountName.substring(0, 50); // Trim to maximum length
    }

    return accountName;
}

// Array of bank image selectors
const bankImages = [
    'img[src="/icons/banks/Askari Bank.svg"]',
    'img[src="/icons/banks/ABBPL.svg"]',
    'img[src="/icons/banks/Person.svg"]',
    'img[src="/icons/banks/Cash.svg"]',
    'img[src="/icons/banks/BAFL.svg"]',
    'img[src="/icons/banks/HBL.svg"]',
    'img[src="/icons/banks/JS Bank.svg"]',
];

// Function to select a bank image
async function selectBankImage(page, bankImages) {
    for (const selector of bankImages) {
        if (await page.$(selector)) {
            await page.click(selector);
            console.log(`Clicked on ${selector}`);
            return selector; // Return the selector of the clicked image
        }
    }
    throw new Error('No bank images found to select.');
}

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
module.exports = { clickViewAllButton,generateUniqueAccountName,bankImages,selectBankImage };