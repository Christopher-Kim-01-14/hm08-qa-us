const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('Completes full process of ordering a taxi', async () => {

        // Setting address
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        /*// Fill in phone number
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();     

        // Input phone number
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();

        // Selecting Supportive plan
        const selectSupportive = await $(page.selectSupportive);
        await selectSupportive.waitForDisplayed();
        await selectSupportive.click();

        // Adding a credit card
        await page.addPaymentMethodCard();
        const cardPaymentMethodIcon = await $(page.cardPaymentMethodIcon);
        await cardPaymentMethodIcon.waitForDisplayed();
        await expect(await $(cardPaymentMethodIcon)).toBeExisting();*/

        // Writing a message for the driver
        const fillComment = await $(page.commentField);
        await page.fillComment.waitForDisplayed();
        await expect(fillComment).toBeExisting();

        // Ordering a blanket and handkerchief
        const blanketAndHandkerchiefsButton = await $(page.blanketAndHandkerchiefsButton);
        await page.blanketAndHandkerchiefsButton.waitForDisplayed();
        // Verify button is selected
        console.log(blanketAndHandkerchiefsButton.isSelected());

        // Ordering 2 ice creams
        const iceCreamPlusButton = await $(page.blanketAndHandkerchiefsButton);
        await page.blanketAndHandkerchiefsButton.waitForDisplayed();
        // Verify 2 ice creams
        const iceCreamCounter = await $(page.iceCreamCounter);
        await page.iceCreamCounter.waitForDisplayed();
        await expect(iceCreamCounter).setValue(2);

        // The car search modal appears

        // Waiting for the driver info to appear

        await browser.pause(3000);
    })
})

