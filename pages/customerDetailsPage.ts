import { Page, expect } from '@playwright/test';
import { AbstractPage } from './abstractPage'
import { websitSettings } from './websiteSettings';
import { PaymentPage } from './paymentPage';

export enum CustomerCheckType {
    checkInOrderFlow = 0,
    checkInputBox,
}

export enum CustomerType {
    individualCustomer = 0,
    corporateCustomer = 1,
}

export class CustomerDetailsPage extends AbstractPage {
    private static readonly corporateInputFields: string[] = websitSettings.customerDetailsPage.corporateInputFields;
    private static readonly individualInputFields: string[] = websitSettings.customerDetailsPage.individualInputFields;
    private static readonly corporateInputValues: string[] = websitSettings.customerDetailsPage.corporateInputValues;
    private static readonly individualInputValues: string[] = websitSettings.customerDetailsPage.individualInputValues;
    private static readonly switchRatios: string[] = websitSettings.customerDetailsPage.switchRatios;
    private static readonly gotoPaymentPageButtonName: string = websitSettings.customerDetailsPage.gotoPaymentPageButtonName;
    private static readonly checkBoxAcceptanceLab:string = websitSettings.customerDetailsPage.checkBoxAcceptanceLab;
    private customerType: CustomerType;
    private checkType: CustomerCheckType;
    public constructor(page: Page, checkType: CustomerCheckType = CustomerCheckType.checkInOrderFlow, customerType: CustomerType = CustomerType.individualCustomer) {
        super(page, websitSettings.customerDetailsPage.path);
        this.customerType = customerType;
        this.checkType = checkType;
    }

    public async specCheck(): Promise<void> {
        // check the ratio can be used to switch customer type
        await this.checkCustomerSwitch();

        // check input boxs
        await this.page.getByLabel(CustomerDetailsPage.switchRatios[this.customerType]).click();
        if (this.customerType == CustomerType.individualCustomer) {
            await this.checkInputField(CustomerDetailsPage.individualInputFields, CustomerDetailsPage.individualInputValues);
        } else if (this.customerType == CustomerType.corporateCustomer) {
            await this.checkInputField(CustomerDetailsPage.corporateInputFields, CustomerDetailsPage.corporateInputValues);
        }
        if (this.checkType == CustomerCheckType.checkInOrderFlow) {
            // submit customer information and goto payment page
            await this.page.getByLabel( CustomerDetailsPage.checkBoxAcceptanceLab).click();
            await this.page.getByRole('button', { name: CustomerDetailsPage.gotoPaymentPageButtonName }).click();
            // check the Url contains the ${paymentPagePath}
            await new PaymentPage(this.page).basicCheck();
        }
    }

    private async checkInputField(ids: string[], values: string[]) {
        for (let i = 0; i < ids.length; i++) {
            let inputField = this.page.locator(ids[i]);
            await expect(inputField).toBeVisible();
            await inputField.fill(values[i]);
        }
    }

    private async checkCustomerSwitch() {
        for (let lab of CustomerDetailsPage.switchRatios) {
            await expect(this.page.getByLabel(lab)).toBeVisible();
        }
    }
}