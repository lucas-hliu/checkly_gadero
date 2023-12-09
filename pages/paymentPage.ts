import { Page, Response, expect } from '@playwright/test';
import { AbstractPage } from './abstractPage';
import { IResponseListener } from './responseListener';
import { websitSettings } from './websiteSettings';
import { PayControllerPage, PayStatus, OrderSuccessPage } from './payControllerPage';

export enum PaymentCheckType {
    checkInOrderFlow = 0,
    checkPayMentMethods,
    checkPayBylink,
    checkPIN
}

export class PaymentPage extends AbstractPage implements IResponseListener {
    private static readonly gotoPayPageButtonName: string = "Betaal je bestelling";
    private paymentMethods: any;
    private payStatus: PayStatus;
    private checkType: PaymentCheckType;
    public constructor(page: Page, checkType: PaymentCheckType = PaymentCheckType.checkInOrderFlow, payStatus: PayStatus = PayStatus.payed) {
        super(page, websitSettings.paymentPage.path);
        this.payStatus = payStatus;
        this.checkType = checkType;
    }

    async onResponse(response: Response): Promise<void> {
        //https://gadero.vercel.app/checkout/customer-details/?_data=routes%2F__layout%2Fcheckout
        //TODO: filter the response to get payment method data. find better solution?
        const resourceType = response.request().resourceType();
        const url = response.url();
        if (resourceType == "fetch" && url.endsWith("checkout")) {
            const json = await response.json();
            this.paymentMethods = json.paymentMethods;
            // console.log(json);
        }
    }

    public async specCheck(): Promise<void> {
        if (this.checkType == PaymentCheckType.checkPayMentMethods) {
            // check the payment methods
            await this.checkPayMentMethods();
        } else if (this.checkType == PaymentCheckType.checkInOrderFlow) {
            // select Apple Pay payment
            let applePay = this.page.getByRole('radio', { name: "Apple Pay" });
            await expect(applePay).toBeVisible();
            await applePay.click();
            //click the button to goto pay page
            let button = this.page.getByRole('button', { name: PaymentPage.gotoPayPageButtonName });
            await expect(button).toBeVisible();
            await button.click();
            await expect(button).toBeHidden();
            // do check in pay page
            let payPage = new PayControllerPage(this.page, this.payStatus);
            await payPage.specCheck();
        } else if (this.checkType == PaymentCheckType.checkPayBylink) {
            await this.checkPayByLink();
        } else if (this.checkType == PaymentCheckType.checkPIN) {
            await this.checkPIN();
        }
    }

    private async checkPayMentMethods() {
        if (this.payStatus == PayStatus.repay) return;

        expect(this.paymentMethods.length > 0);
        // check that all payment methods are available
        for (let i = 0; i < this.paymentMethods.length; i++) {
            const paymentMethod = this.paymentMethods[i];
            // console.log(paymentMethod);
            let lab: any;
            if (paymentMethod.price?.value) {
                lab = `${paymentMethod.name} ${paymentMethod.price?.value},-`;
            }
            else {
                lab = `${paymentMethod.name} gratis`;
            }
            // only check the payment name with RegExp
            // lab = new RegExp(`${paymentMethod.name}.*`, "i");
            await expect(this.page.getByRole('radio', { name: lab })).toBeVisible()
            // await this.page.getByRole('radio', { name: lab }).click();
            console.log(`payment method: ${paymentMethod.name} checked`);
        }
    }

    private async checkPayByLink() {
        let payByLink = this.page.getByRole('radio', { name: "Pay by Link" });
        await expect(payByLink).toBeVisible();
        await payByLink.click();

        //click the button to goto thank you page
        let button = this.page.getByRole('button', { name: PaymentPage.gotoPayPageButtonName });
        await expect(button).toBeVisible();
        await button.click();
        await expect(button).toBeHidden();
        // do check in thank you page
        let orderSuccessPage = new OrderSuccessPage(this.page);
        await orderSuccessPage.specCheck();
    }

    private async checkPIN() {
        let payByLink = this.page.getByRole('radio', { name: "PIN" });
        await expect(payByLink).toBeVisible();
    }
}

