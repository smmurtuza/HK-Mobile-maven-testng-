//const { expect } = require('@playwright/test');


async function initializePage(browserName, browser, iPhone11) {
    let context;
    let page;

    context = browserName === 'firefox' ? await browser.newContext() : await browser.newContext({ ...iPhone11 });
    page = await context.newPage();

    return { context, page };
}

//module.exports = { initializePage };
