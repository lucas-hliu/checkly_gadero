import { Page, expect } from '@playwright/test';
import { websitSettings } from './websiteSettings';

export abstract class AbstractPage {
    protected path: string; // path of the page, it is used to check URL
    protected page: Page;   // page object of playwright

    public constructor(page: Page, path: string = "") {
        this.page = page;
        this.path = path;
    }

    public async gotoPageAndCheck() {
        await this.gotoPage();
        await this.check();
    }

    // goto the page and check the status code
    public async gotoPage() {
        // goto page
        const uri = websitSettings.baseUrl + this.path;
        console.log(`goto ${uri}`);
        const response = await this.page.goto(uri, {waitUntil: "domcontentloaded"});
        console.log("goto " + uri + " status:" + response?.status());
        expect(response?.status()).toEqual(200);
    }

    public async check() {
        await this.basicCheck();
        await this.specCheck();
    }

    // basic check for all page,
    // only check the url contains the ${path}  
    public async basicCheck() {
        // check the Url contains the ${path} except homePage 
        if (this.path?.length > 0) {
            await this.page.waitForLoadState("networkidle");
            console.log(`check the URL contains ${this.path}`);
            const regexp = new RegExp(".*" + this.path, "i");
            await expect(this.page).toHaveURL(regexp);
        }
    }

    // implement this method in inherited classes
    // and implement the specific checking logic for associated web pages
    public abstract specCheck(): Promise<void>;
}