// elementUtils.js
const { expect } = require('@playwright/test');

async function waitForElement(page, selector, { type = 'visible', timeout = 10000 } = {}) {
    if (type === 'visible') {
        await expect(page.locator(selector)).toBeVisible({ timeout });
    } else if (type === 'selector') {
        await page.waitForSelector(selector, { timeout });
    } else {
        throw new Error(`Unknown wait type: ${type}`);
    }
}

module.exports = { waitForElement };
