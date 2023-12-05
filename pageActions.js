const { expect } = require('@playwright/test');

async function performAction(page,action, selector, value = '') {
    switch (action) {
        case 'fill':
            await page.fill(selector, value);
            break;
        case 'click':
            await page.click(selector);
            break;
        case 'hover':
            await page.hover(selector);
            break;
        case 'doubleClick':
            await page.dblclick(selector);
            break;
        // You can add more cases here for other actions as needed
        default:
            throw new Error(`Unknown action: ${action}`);
    }
};


async function safelyPerformAction(page,action, selector, value = '') {
    try {
        await performAction(page,action, selector, value);
    } catch (error) {
        console.error(`Error performing action ${action} on ${selector}:`, error);
    }
}

module.exports = { safelyPerformAction, performAction };