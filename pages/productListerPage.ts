import { Page, Response, expect } from '@playwright/test';
import { AbstractPage } from './abstractPage'
import { IResponseListener } from './responseListener';
import { websitSettings } from './websiteSettings';
import { ProductDetailsPage, ProductCheckType } from './productDetailPage';

export enum ProductListerCheckType {
    checkProductCount,
    checkGotoProductDetailPage,    
}

export class ProductListerPage extends AbstractPage implements IResponseListener {
    private nextResponseListener: IResponseListener;
    private checkType: ProductListerCheckType;
    private productCheckType: ProductCheckType;
    private productCount: number;
    public constructor(page: Page, productCheckType: ProductCheckType, checkType: ProductListerCheckType) {
        super(page, websitSettings.productListerPage.path);
        this.productCheckType = productCheckType;
        this.checkType = checkType;
    }

    async onResponse(response: Response): Promise<void> {
        await this.nextResponseListener?.onResponse(response);
        // filter the response to get the relatedProducts/extraExtraOptions json data
        const dataUrl: string = `${this.path}?_data=routes%2F__layout%2F%24`;
        const resourceType = response.request().resourceType();
        const url: string = response.url();

        if (resourceType == "fetch" && url.endsWith(dataUrl)) {
            const json = await response.json();
            this.productCount = json?.result?.api?.pagination.total;
        }
    }

    public async specCheck(): Promise<void> {
        const cookies = this.page.getByRole('button', { name: 'Alles accepteren' })
        await expect(cookies).toBeVisible();
        // click the button to accept cookies
        await cookies.click();

        if (this.checkType == ProductListerCheckType.checkProductCount) {
            // check product count
            await this.checkProductCount();
        } else {
            // goto product detail page
            const productCard = this.page.getByRole('link', { name: new RegExp(`.*Blokhut Minimodern.*`, "i") });
            await expect(productCard).toBeVisible();
            await productCard.click();

            const productDetailPage = new ProductDetailsPage(this.page, "blokhut-minimodern", this.productCheckType);
            this.nextResponseListener = productDetailPage;
            await productDetailPage.check();
        }
    }

    public async checkProductCount() {
        let text = `${this.productCount} producten`; 
        await this.page.getByText(text).click();
    }
}
