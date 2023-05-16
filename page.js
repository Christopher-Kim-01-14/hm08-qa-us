module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumber: '#number',
    cardCode: '.card-second-row #code',
    commentField: '#comment',
    filledCommentField: '#comment[value="Sup, dude!"]',
    
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: 'div*=Phone number',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentMethodButton: '.pp-text',
    addCardButton: 'div=Add card',
    linkCardButton: 'button=Link',
    closePaymentMethodModalButton: '.payment-picker .close-button',
    selectSupportive: 'div=Supportive',
    blanketAndHandkerchiefsButton: '.switch',
    iceCreamPlusButton: 'counter-plus',
    openCarModal: '.smart-button-wrapper .smart-button',

    // Modals
    phoneNumberModal: '.modal',
    carSearchModal: '.order-subbody',

    // Misc
    cardSignatureStrip: '.plc',
    cardPaymentMethodIcon: 'img[alt="card"]',
    iceCreamCounter: '.counter-value=2',
    driverRating: '.order-btn-rating',

    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed();
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        // add check that we have only one response
        const code = await requests[0].response.body.code
        await codeField.setValue(code);
        await $(this.confirmButton).click();
    },
    addPaymentMethodCard: async function() {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();

        // Clicking add card
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();

        // Inputting card number
        const cardNumber = await $(this.cardNumber);
        await cardNumber.waitForDisplayed();
        await cardNumber.setValue(1234123412341234);

        // Inputting card code
        const cardCode = await $(this.cardCode);
        await cardCode.waitForDisplayed();
        await cardCode.setValue(123);

        // Click signature strip
        const cardSignatureStrip = await $(this.cardSignatureStrip);
        await cardSignatureStrip.waitForDisplayed();
        await cardSignatureStrip.click();

        // Click link button
        const linkCardButton = await $(this.linkCardButton);
        await linkCardButton.waitForDisplayed();
        await linkCardButton.click();

        // Close payment method modal
        const closePaymentMethodModalButton = await $(this.closePaymentMethodModalButton);
        await closePaymentMethodModalButton.waitForDisplayed();
        await closePaymentMethodModalButton.click();
    },
    fillComment: async function(comment) {
        // Input message to driver
        const commentField = await $(this.commentField);
        await commentField.waitForDisplayed();
        await commentField.setValue(comment);
    },
    clickBlanketButton: async function() {
        // Click blanket and handkerchiefs button
        const blanketAndHandkerchiefsButton = await $(this.blanketAndHandkerchiefsButton);
        await blanketAndHandkerchiefsButton.waitForDisplayed();
        await blanketAndHandkerchiefsButton.click();
    },
    clickIceCreamButton: async function() {
        // Click ice cream plus button twice
        const iceCreamPlusButton = await $(this.iceCreamPlusButton);
        await iceCreamPlusButton.waitForDisplayed();
        await iceCreamPlusButton.click();
        await iceCreamPlusButton.click();
        /*for (let i=0; i <=2; i++) {
            await iceCreamPlusButton.click();
        }*/
    },
    waitForFillComment: async function() {
        const fillComment = await $(this.commentField);
        await fillComment.waitForDisplayed();
    },
    openCarSearchModal: async function() {
        // Click order button
        const clickOrderButton = await $(this.openCarModal);
        await clickOrderButton.waitForDisplayed();
        await clickOrderButton.click();
    },       
};