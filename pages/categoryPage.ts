import { Page, Response, expect } from '@playwright/test';
import { AbstractPage } from './abstractPage';
import { IResponseListener } from './responseListener';
import { websitSettings } from './websiteSettings';
import { ProductCheckType } from './productDetailPage';
import { ProductListerCheckType, ProductListerPage } from './productListerPage';

export class CategoryPage extends AbstractPage implements IResponseListener {
    private static readonly categoryCardPattern: string  = websitSettings.categoryPage.categoryCardPattern;
    private nextResponseListener?: IResponseListener;
    public constructor(page: Page) {
        super(page, websitSettings.categoryPage.path);
    }
    async onResponse(response: Response): Promise<void> {
        await this.nextResponseListener?.onResponse(response);
    }
    public async specCheck(): Promise<void> {
        const productListerPage = new ProductListerPage(this.page, ProductCheckType.checkInOrderFlow, ProductListerCheckType.checkProductCount);
        this.nextResponseListener = productListerPage;
        // goto product lister page
        const categoryCard = this.page.getByRole('link', { name: new RegExp(CategoryPage.categoryCardPattern, "i") });
        await expect(categoryCard).toBeVisible();
        // in PROD, need to accept cookies when entering category page in the first time
        if (process.env.ENV as string == "PROD")
            await this.cookiesAccept();
        await categoryCard.click();

        await productListerPage.check();
    }
}
