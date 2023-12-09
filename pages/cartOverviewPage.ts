import { Page, expect } from '@playwright/test';
import { AbstractPage } from './abstractPage'
import { websitSettings } from './websiteSettings';
import { CustomerDetailsPage } from './customerDetailsPage';

export class CartOverviewPage extends AbstractPage {
    private static readonly addrEditLab: string = websitSettings.cartOverviewPage.addrEditLab;
    private static readonly gotoCustomerPageButtonName: string = websitSettings.cartOverviewPage.gotoCustomerPageButtonName;
    private static readonly shippingOptionLab: string = websitSettings.cartOverviewPage.shippingOptionLab;
    private static readonly addrInputPlaceholder: string = websitSettings.cartOverviewPage.addrInputPlaceholder;
    public constructor(page: Page) {
        super(page, websitSettings.cartOverviewPage.path);
    }

    public async specCheck(): Promise<void> {
        // input addr
        await this.fillAddr();
        // check the addr edit button
        await expect(this.page.getByRole('button', { name: CartOverviewPage.addrEditLab })).toBeVisible();
        const shippingOptionLab = this.page.getByRole('radio', { name: websitSettings.cartOverviewPage.shippingOptionLab, exact: true});
        await expect(shippingOptionLab).toBeVisible();

        await expect(this.page.getByLabel(CartOverviewPage.shippingOptionLab)).toBeVisible();

        // click the button to goto customer details page
        let button = this.page.getByRole('button', { name: CartOverviewPage.gotoCustomerPageButtonName }).first();
        await expect(button).toBeVisible();
        await button.click();
        // check the Url contains the ${customerPagePath}
        await new CustomerDetailsPage(this.page).basicCheck();
    }

    private async fillAddr() {
        let addrInput = this.page.getByPlaceholder(CartOverviewPage.addrInputPlaceholder);
        await expect(addrInput).toBeVisible();
        await addrInput.click();
        await addrInput.fill('X');
        const lang: string = process.env.LANG as string; 
        if (lang == "FR") {
            await this.page.locator('li').filter({ hasText: 'Dix Maisons15700 Pleaux' }).click();
            await this.page.locator('li').filter({ hasText: '1 Dix Maisons, Pleaux' }).click();
        } 
        else if (lang == "DE") {
            await this.page.locator('li').filter({ hasText: 'Zehnt98660 Themar' }).click();
            await this.page.locator('li').filter({ hasText: 'Themar, Zehnt 4' }).click();
        } 
        else if (lang == "BE") {
            await this.page.locator('li').filter({ hasText: 'Tiensebaan(3 gemeenten)' }).click();
            await this.page.locator('li').filter({ hasText: '3472 Kortenaken' }).click();
            await this.page.locator('li').filter({ hasText: 'Kortenaken, Tiensebaan 3' }).click();
        } else { 
            await this.page.locator('div').filter({ hasText: /^Pius X-hof\(2 steden\)$/ }).first().click();
            await this.page.locator('div').filter({ hasText: /^EchtPius X-hof$/ }).first().click();
            await this.page.locator('div').filter({ hasText: /^Echt, Pius X-hof 1$/ }).first().click();
        }
    }
}