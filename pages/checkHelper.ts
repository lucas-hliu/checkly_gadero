import { Page } from '@playwright/test';
import { websitSettings } from './websiteSettings';
import { websitePwdPage } from './websitePwdPage';
import { ProductDetailsPage, ProductCheckType } from './productDetailPage';
import { CartOverviewPage } from './cartOverviewPage';
import { CustomerDetailsPage, CustomerType, CustomerCheckType } from './customerDetailsPage';
import { PaymentPage, PaymentCheckType } from './paymentPage';
import { PayStatus } from './payControllerPage';
import { ProductListerPage, ProductListerCheckType } from './productListerPage';
import { CategoryPage } from './categoryPage';

interface OrderFlowCheckOptions {
    productSlug: string;
    customerType: CustomerType;
    payStatus: PayStatus;
}

interface ProductCheckOptions {
    productSlug: string;
    checkType: ProductCheckType;
}

interface CustomerCheckOptions {
    productSlug: string;
    customerType: CustomerType;
    checkType: CustomerCheckType;
}

interface PayMentCheckOptions {
    productSlug: string;
    checkType: PaymentCheckType;
}

export class CheckHelper {

    public static async CheckIndividualCustomerOrderFailedFlow(page: Page) {
        const options = {
            productSlug: websitSettings.productslug,
            customerType: CustomerType.individualCustomer,
            payStatus: PayStatus.cancel
        };
        await CheckHelper.customerOrderFlowCheck(page, options);
    }

    public static async checkCorporateCustomerOrderFailedFlow(page: Page) {
        const options = {
            productSlug: websitSettings.productslug,
            customerType: CustomerType.corporateCustomer,
            payStatus: PayStatus.cancel
        };
        await CheckHelper.customerOrderFlowCheck(page, options);
    }

    public static async CheckIndividualCustomerOrderSuccessFlow(page: Page) {
        const options = {
            productSlug: websitSettings.productslug,
            customerType: CustomerType.individualCustomer,
            payStatus: PayStatus.payed
        };
        await CheckHelper.customerOrderFlowCheck(page, options);
    }

    public static async CheckCorporateCustomerOrderSuccessFlow(page: Page) {
        const options = {
            productSlug: websitSettings.productslug,
            customerType: CustomerType.corporateCustomer,
            payStatus: PayStatus.payed
        };
        await CheckHelper.customerOrderFlowCheck(page, options);
    }

    public static async CheckProductCount(page: Page) {
        await websitePwdPage.LoginIfNeed(page);
        const categoryPage = new CategoryPage(page);
        //set the listener to receive response data
        page.on("response", async (response) => {
            await categoryPage.onResponse(response);
        });

        await categoryPage.gotoPageAndCheck();
      }

    public static async CheckRelatedProducts(page: Page) {
        const options = {
            productSlug: websitSettings.productslug,
            checkType: ProductCheckType.checkRelatedProducts
        };
        await CheckHelper.productCheck(page, options);
    }

    public static async CheckExtraOptions(page: Page) {
        const options = {
            productSlug: websitSettings.productslug,
            checkType: ProductCheckType.checkExtraOptions
        };
        await CheckHelper.productCheck(page, options);
    }

    public static async CheckIndividualCustomerDetailsFilled(page: Page) {
        const options = {
            productSlug: websitSettings.productslug,
            checkType: CustomerCheckType.checkInputBox,
            customerType: CustomerType.individualCustomer
        }

        await CheckHelper.customerCheck(page, options);
    }

    public static async CheckCorporateCustomerDetailsFilled(page: Page) {
        const options = {
            productSlug: websitSettings.productslug,
            checkType: CustomerCheckType.checkInputBox,
            customerType: CustomerType.corporateCustomer
        }

        await CheckHelper.customerCheck(page, options);
    }

    public static async CheckAllPaymentMethodsVisiable(page: Page) {
        let options = {
            productSlug: websitSettings.productslug,
            checkType: PaymentCheckType.checkPayMentMethods,
        }

        await this.paymentCheck(page, options);
    }

    public static async CheckPayByLinkPaymentMethodVisibleAndOrder(page: Page) {
        let options = {
            productSlug: websitSettings.productslug,
            checkType: PaymentCheckType.checkPayBylink,
        }

        await this.paymentCheck(page, options);
    }

    public static async CheckPINpaymentMethodVisable(page: Page) {
        let options = {
            productSlug: websitSettings.productslug,
            checkType: PaymentCheckType.checkPIN,
        }

        await this.paymentCheck(page, options);
    }

    private static async productCheck(page: Page, options: ProductCheckOptions) {
        await websitePwdPage.LoginIfNeed(page);
        let productListerPage = new ProductListerPage(page, options.checkType, ProductListerCheckType.checkGotoProductDetailPage);
        //set the listener to receive response data
        page.on("response", async (response) => {
            await productListerPage.onResponse(response);
        });

        await productListerPage.gotoPageAndCheck();
    }

    private static async customerCheck(page: Page, options: CustomerCheckOptions) {
        await websitePwdPage.LoginIfNeed(page);

        await new ProductDetailsPage(page, options.productSlug).gotoPageAndCheck();
        await new CartOverviewPage(page).gotoPageAndCheck();
        await new CustomerDetailsPage(page, options.checkType, options.customerType).gotoPageAndCheck();
    }

    private static async paymentCheck(page: Page, options: PayMentCheckOptions) {
        let paymentPage = new PaymentPage(page, options.checkType);
        //set the listener to receive response data
        page.on("response", async (response) => {
            await paymentPage.onResponse(response);
        });

        await websitePwdPage.LoginIfNeed(page);

        await new ProductDetailsPage(page, options.productSlug).gotoPageAndCheck();
        await new CartOverviewPage(page).gotoPageAndCheck();
        await new CustomerDetailsPage(page, CustomerCheckType.checkInOrderFlow, CustomerType.individualCustomer).gotoPageAndCheck();
        await paymentPage.gotoPageAndCheck();
    }

    private static async customerOrderFlowCheck(page: Page, options: OrderFlowCheckOptions) {
        let paymentPage = new PaymentPage(page, PaymentCheckType.checkInOrderFlow, options.payStatus);
        //set the listener to receive response data
        page.on("response", async (response) => {
            await paymentPage.onResponse(response);
        });

        await websitePwdPage.LoginIfNeed(page);

        await new ProductDetailsPage(page, options.productSlug).gotoPageAndCheck();
        await new CartOverviewPage(page).gotoPageAndCheck();
        await new CustomerDetailsPage(page, CustomerCheckType.checkInOrderFlow, options.customerType).gotoPageAndCheck();
        await paymentPage.gotoPageAndCheck();
    }
}
