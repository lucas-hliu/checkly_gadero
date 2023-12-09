import { Page } from '@playwright/test';
import { websitSettings } from './websiteSettings';


export class websitePwdPage {
    private static readonly passWordLab: string = "VISITOR PASSWORD";
    public static async LoginIfNeed(page: Page) {
        if (!this.checkNeedLogin()) return;
        await page.goto(websitSettings.baseUrl);
        // input the password and Enter to login
        await page.getByLabel(websitePwdPage.passWordLab).fill(websitSettings.passWord);
        await page.getByRole('button', { name: 'Log in' }).click();
        // await page.waitForLoadState("domcontentloaded");
    }

    private static checkNeedLogin() {
        // return true if the websit is protected
        if (process.env.ENV as string == "DEV") 
            return true;
        return false;
    }
}