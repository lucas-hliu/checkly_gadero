import { Page, expect } from '@playwright/test';
import { AbstractPage } from './abstractPage';
import { websitSettings } from './websiteSettings';
import { PaymentPage, PaymentCheckType } from './paymentPage';
export enum PayStatus {
    payed = 0,
    cancel,
    repay,
}

export class OrderSuccessPage extends AbstractPage {
    public constructor(page: Page) {
        super(page, websitSettings.orderSuccessPage.path);
    }
    public async specCheck(): Promise<void> {
    }
}

export class OrderFailedPage extends AbstractPage {
    private static readonly gotoPaymentPageButtonLab: string = websitSettings.orderFailedPage.gotoPaymentPageButtonLab;
    public constructor(page: Page) {
        super(page, websitSettings.orderFailedPage.path);
    }
    public async specCheck(): Promise<void> {
        // click the button to goto payment page and repay
        let button = this.page.getByRole('link', { name: OrderFailedPage.gotoPaymentPageButtonLab });
        await expect(button).toBeVisible();
        await button.click();
        await new PaymentPage(this.page, PaymentCheckType.checkInOrderFlow, PayStatus.repay).check();
    }
}

//third party pay page
export class PayControllerPage extends AbstractPage {
    private static readonly tokenInputID: string = "#token-input";
    private static readonly token: string = websitSettings.paymentToken;
    private static readonly optionPayedID: string = "#formSubmit1";
    private static readonly optionCancelID: string = "#formSubmit4";

    private payStatus: PayStatus;
    public constructor(page: Page, status: PayStatus) {
        if (process.env.ENV as string == "PROD") {
            super(page, websitSettings.payControllerPage.prodPath);
        }
        else {
            super(page, websitSettings.payControllerPage.path);
        }
        this.payStatus = status;
    }
    public async specCheck(): Promise<void> {
        // input the pay token
        let inputBox = this.page.locator(PayControllerPage.tokenInputID);
        await expect(inputBox).toBeVisible();
        await inputBox.fill(PayControllerPage.token);
        if (this.payStatus != PayStatus.cancel) {// order success flow
            // click the payed button and goto the order success page
            let button = this.page.locator(PayControllerPage.optionPayedID);
            await expect(button).toBeVisible();
            await button.click();
            let orderSuccessPag = new OrderSuccessPage(this.page);
            await orderSuccessPag.check();
        } else {//order failed flow
            // click the cancel button to goto the order failed page
            let button = this.page.locator(PayControllerPage.optionCancelID);
            await expect(button).toBeVisible();
            await button.click();
            let orderFailedPage = new OrderFailedPage(this.page);
            await orderFailedPage.check();
        }
    }
}
