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
    private static readonly gotoPayPageButtonName: string = websitSettings.paymentPage.gotoPayPageButtonName;
    private static readonly applePayName: string = websitSettings.paymentPage.applePayName;
    private static readonly payByLinkName: string = websitSettings.paymentPage.payByLinkName;
    private static readonly pinPayName: string = websitSettings.paymentPage.pinPayName;
    private static readonly freeLab: string = websitSettings.paymentPage.freeLab;
    
    
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
        // filter the response to get payment method data
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
            let applePay = this.page.getByRole('radio', { name: PaymentPage.applePayName });
            await expect(applePay).toBeVisible();
            await applePay.click();
            //click the button to goto pay page
            let button = this.page.getByRole('button', { name: PaymentPage.gotoPayPageButtonName });
            await expect(button).toBeVisible();
            await button.click();
            await expect(button).toBeHidden();
            // do check in pay page
            let payPage = new PayControllerPage(this.page, this.payStatus);
            if (process.env.ENV as string == "PROD") {
                await payPage.basicCheck();
            } else {
                await payPage.specCheck();
            }
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
                lab = `${paymentMethod.name} ${PaymentPage.freeLab}`;
            }
            // only check the payment name with RegExp
            // lab = new RegExp(`${paymentMethod.name}.*`, "i");
            await expect(this.page.getByRole('radio', { name: lab })).toBeVisible()
            // await this.page.getByRole('radio', { name: lab }).click();
            console.log(`payment method: ${paymentMethod.name} checked`);
        }
    }

    private async checkPayByLink() {
        let payByLink = this.page.getByRole('radio', { name: PaymentPage.payByLinkName });
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
        let pin = this.page.getByRole('radio', { name: PaymentPage.pinPayName });
        await expect(pin).toBeVisible();
    }
}

