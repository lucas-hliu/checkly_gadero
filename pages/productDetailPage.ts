import { Page, Response, expect } from '@playwright/test';
import { AbstractPage } from './abstractPage'
import { CartOverviewPage } from './cartOverviewPage';
import { IResponseListener } from './responseListener';
import { websitSettings } from './websiteSettings';

export enum ProductCheckType {
    checkInOrderFlow = 0,
    checkRelatedProducts,
    checkExtraOptions,
}

export class ProductDetailsPage extends AbstractPage implements IResponseListener {
    private static readonly addToCartButtonName: string = websitSettings.productDetailPage.addToCartButtonName;
    private static readonly gotoCartButtonName: string = websitSettings.productDetailPage.gotoCartButtonName;
    private slug: string;
    private checkType: ProductCheckType;
    private relatedProducts: any;
    private extraOptions: any;
    public constructor(page: Page, slug: string, checkType: ProductCheckType = ProductCheckType.checkInOrderFlow) {
        super(page, slug);
        this.checkType = checkType;
        this.slug = slug;
    }

    async onResponse(response: Response): Promise<void> {
        // https://gadero.vercel.app/picknicktafel-gadero/?_data=routes%2F__layout%2F%24
        // filter the response to get the relatedProducts/extraExtraOptions json data
        const dataUrl: string = `${this.slug}/?_data=routes%2F__layout%2F%24`;
        const resourceType = response.request().resourceType();
        const url: string = response.url();
        if (resourceType == "fetch" && url.endsWith(dataUrl)) {
            console.log(url);
            console.log(decodeURI(url));
            const json = await response.json();
            this.relatedProducts = json?.result?.relatedProducts;
            this.extraOptions = json?.result?.extraOptions;
            // console.log(json?.result?.relatedProducts);
            // console.log(json?.result?.extraOptions)
        }
    }

    public async specCheck(): Promise<void> {
        if (this.checkType == ProductCheckType.checkInOrderFlow) {
            await this.cookiesAccept();
        }

        switch (this.checkType) {
            case ProductCheckType.checkRelatedProducts: {
                await this.relatedProductsCheck();
                break;
            }
            case ProductCheckType.checkExtraOptions: {
                await this.extraProductsCheck();
                break;
            }
            default: {
                // check the add to cart button
                await expect(this.page.getByRole('button', { name: ProductDetailsPage.addToCartButtonName })).toBeVisible();
                // click the button to add this product to cart 
                await this.page.getByRole('button', { name: ProductDetailsPage.addToCartButtonName }).click();
                // click the link to goto cart page
                await this.page.getByRole('link', { name: ProductDetailsPage.gotoCartButtonName }).click();
                // check the Url contains the ${cartPagePath}
                await new CartOverviewPage(this.page).basicCheck();
                break;
            }
        }
    }

    private async relatedProductsCheck() {
        // expect(this.relatedProducts.length > 0);
        // check that all relatedProducts are available
        for (let i = 0; i < this.relatedProducts?.length; i++) {
            let relatedProduct = this.relatedProducts[i];
            let lab: any;
            lab = new RegExp(`.* ${relatedProduct.name}.*`, "i");
            await expect(this.page.getByRole('link', { name: lab })).toBeVisible();
        }
    }

    private async extraProductsCheck() {
        // expect(this.relatedProducts.length > 0);
        // check that all extraProducts are available
        for (let i = 0; i < this.extraOptions?.length; i++) {
            let extraOption = this.extraOptions[i];
            // console.log(extraOption);
            const optionHeading = this.page.getByText(extraOption.label, { exact: true });
            await expect(optionHeading).toBeVisible();
            if (i != 0) {
                //click the option to expand products
                await optionHeading.click();
            }
            let optionProducts: any = extraOption.optionProducts;
            for (let optionProduct of optionProducts) {
                // console.log(optionProduct.product.name);
                let lab: any = optionProduct.product.name;
                //let lab: RegExp = new RegExp(`.*${optionProduct.product.name}.*`, "i");
                //console.log(lab.test('funderingsbalk_kunststof_standaard Funderingsbalken - Kunststof (4 stuks) 131,80 incl. BTW'));
                let optionProductCard = this.page.getByRole('radio', { name: lab });
                await expect(optionProductCard).toBeVisible();
            }
        }
    }
}
