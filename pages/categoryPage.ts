import { Page, Response, expect } from '@playwright/test';
import { AbstractPage } from './abstractPage';
import { IResponseListener } from './responseListener';
import { websitSettings } from './websiteSettings';
import { ProductCheckType } from './productDetailPage';
import { ProductListerCheckType, ProductListerPage } from './productListerPage';

export class CategoryPage extends AbstractPage implements IResponseListener {
    private nextResponseListener: IResponseListener;
    public constructor(page: Page) {
        super(page, websitSettings.categoryPage.path);
    }
    async onResponse(response: Response): Promise<void> {
        await this.nextResponseListener?.onResponse(response);
    }
    public async specCheck(): Promise<void> {
        // goto product lister page
        const categoryCard = this.page.getByRole('link', { name: new RegExp(`Blokhut circa 3x2 meter.*`, "i") });
        await expect(categoryCard).toBeVisible();
        await categoryCard.click();

        const productListerPage = new ProductListerPage(this.page, ProductCheckType.checkInOrderFlow, ProductListerCheckType.checkProductCount);
        this.nextResponseListener = productListerPage;
        await productListerPage.check();

    }
}
