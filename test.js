const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://example.com/login');

    await page.fill('#username', 'yourUsername');
    await page.fill('#password', 'yourPassword');
    await page.click('#loginButton');

    // Playwright waits for actions to be completed by default (auto-wait)
    await page.waitForSelector('#logoutButton'); // Ensure logout button is loaded

    await browser.close();
})();
