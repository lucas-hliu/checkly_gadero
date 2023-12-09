import { Page, expect } from '@playwright/test';
import { AbstractPage } from './abstractPage'
import { websitSettings } from './websiteSettings';
import { CustomerDetailsPage } from './customerDetailsPage';

export class CartOverviewPage extends AbstractPage {
    private static readonly addrEditLab: string = 'Wijzigen';
    private static readonly gotoCustomerPageButtonName: string = 'Volgende stap';
    public constructor(page: Page) {
        super(page, websitSettings.cartOverviewPage.path);
    }

    public async specCheck(): Promise<void> {
        // input addr
        // TODO: refine the input logic? find better way?
        let addrInput = this.page.getByPlaceholder('Vul hier je postcode en huisnummer in');
        await expect(addrInput).toBeVisible();
        await addrInput.click();
        await addrInput.fill('X');
        await this.page.locator('div').filter({ hasText: /^Pius X-hof\(2 steden\)$/ }).first().click();
        await this.page.locator('div').filter({ hasText: /^EchtPius X-hof$/ }).first().click();
        await this.page.locator('div').filter({ hasText: /^Echt, Pius X-hof 1$/ }).first().click();
        // check the addr edit button
        await expect(this.page.getByRole('button', { name: CartOverviewPage.addrEditLab })).toBeVisible();

        await expect(this.page.getByLabel('Laten bezorgen')).toBeVisible();

        // click the button to goto customer details page
        let button = this.page.getByRole('button', { name: CartOverviewPage.gotoCustomerPageButtonName }).first();
        await expect(button).toBeVisible();
        await button.click();
        // check the Url contains the ${customerPagePath}
        await new CustomerDetailsPage(this.page).basicCheck();
    }
}