const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    /*it('should add a card payment method', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        // Adding a card payment method
        const cardNumber = helper.getCardNumber();
        const cardCode = helper.getCardCode();
        await page.addPaymenMethodCard(cardNumber, cardCode);
        await expect(await $(`${page.paymentMethodAddedCard}`)).toBeExisting();
    })*/
    it('Completes full process of ordering a taxi', async () => {

        // Setting address
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        // Selecting Supportive plan
        const selectSupportive = await $(page.selectSupportive);
        await selectSupportive.waitForDisplayed();
        await selectSupportive.click();

        // Input phone number
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
                               
        // Adding a credit card
        await page.addPaymentMethodCard();
        const cardPaymentMethodIcon = await $(page.cardPaymentMethodIcon);
        await cardPaymentMethodIcon.waitForDisplayed();
        await expect(await $(cardPaymentMethodIcon)).toBeExisting();

        // Writing a message for the driver
        await page.fillComment('Sup, dude!');
        await page.waitForFillComment();
        await expect($(page.filledCommentField)).toHaveValue('Sup, dude!');
        
        // Ordering a blanket and handkerchief
        const blanketAndHandkerchiefsButton = await page.clickBlanketButton;
        await blanketAndHandkerchiefsButton.waitForDisplayed();
        // Verify button is selected
        

        // Ordering 2 ice creams
        const iceCreamPlusButton = await page.clickIceCreamButton;
        
        // Verify 2 ice creams
        const iceCreamCounter = await $(page.iceCreamCounter);
        await iceCreamCounter.waitForDisplayed();
        await expect(await iceCreamCounter).toBe(2);

        // The car search modal appears
        const openCarSearchModal = await page.openCarSearchModal;
        const carSearchModal = await $(page.carSearchModal);
        await carSearchModal.waitForDisplayed();
        await expect(carSearchModal).toBeExisting();

        // Waiting for the driver info to appear
        const driverRating = await $(page.driverRating);
        await driverRating.waitForDisplayed();
        await expect(driverRating).toBeExisting();

        await browser.pause(2000);

    })
})

