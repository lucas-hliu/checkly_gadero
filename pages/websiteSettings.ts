// define some basic config data 
export const websitSettings = {
    baseUrl: process.env.baseUrl as string,
    passWord: process.env.passWord as string,
    productslug: "picknicktafel-gadero",

    //settings for pages in NL
    categoryPage:{
        path: "blokhut-afmetingen/"
    },
    productListerPage: {
        path: "blokhut-3x2/",
    },
    productDetailPage: {
    },
    cartOverviewPage: {
        path: "winkelwagen/",
    },
    customerDetailsPage: {
        path: "checkout/customer-details/",
    },
    paymentPage: {
        path: "checkout/payment/"
    },
    payControllerPage: {
        path: "controllers/payments/"
    },
    orderSuccessPage: {
        path: "checkout/thank-you/"
    },
    orderFailedPage: {
        path: "checkout/failure/",
    }
}

