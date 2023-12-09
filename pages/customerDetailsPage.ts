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
    private static readonly corporateInputFields: string[] = ["#companyName", "#kvkNumber", "#vatNumber", "#firstName", "#lastName", "#email", "#phone", "#comments"];
    private static readonly individualInputFields: string[] = ["#firstName", "#lastName", "#email", "#phone", "#comments"];
    private static readonly corporateInputValues: string[] = ["rb2", "kvk123", "DE9876543210", "jennifer", "chen", "jennifer@rb2.nl", "14598768572", "test"];
    private static readonly individualInputValues: string[] = ["jennifer", "chen", "jennifer@rb2.nl", "14598768572", "test"];
    private static readonly switchRatios: string[] = ["Particulier", "Bedrijf"];
    private static readonly gotoPaymentPageButtonName: string = "Ga naar stap 2: Betaling";
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
            await this.page.getByLabel('Ik heb de algemene voorwaarden gelezen en ik ga hiermee akkoord. Eveneens heb ik mijn gegevens gecontroleerd').click();
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