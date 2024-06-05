const { expect } = require('@playwright/test');

async function verifyExpectedToastMessage(page, expectedMessage) {
    try {
      // Wait for the toast element with a configurable timeout
      const toastTimeout = 5000; // Adjust timeout as needed (milliseconds)
      const toastMessage = await page.waitForSelector('.Toastify__toast-body', { state: 'visible', timeout: toastTimeout });
  
      // Extract text and perform exact match for consistency
      const toastMessageText = await toastMessage.innerText();
      if (toastMessageText !== expectedMessage) {
        throw new Error(`Expected toast message: "${expectedMessage}" but found: "${toastMessageText}"`);
      }
  
      console.log(`Toast message verified: "${expectedMessage}"`);
    } catch (error) {
      console.error("Error verifying toast message:", error.message);
    }
  }

module.exports = {verifyExpectedToastMessage};