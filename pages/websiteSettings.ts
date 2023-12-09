interface CategoryPageSetting {
    path:string;
    categoryCardPattern:string;
}
interface ProductListerPageSettings {
    productCardPattern: string;
    productCountLab: string;
}
interface ProductDetailPageSettings {
    addToCartButtonName: string;
    gotoCartButtonName: string;
}
interface CartOverviewPageSettings {
    path: string;
    addrEditLab: string;
    gotoCustomerPageButtonName: string;
    shippingOptionLab: string;
    addrInputPlaceholder: string;
}
interface CustomerDetailsPageSettings {
    path: string;
    corporateInputFields: string[];
    individualInputFields: string[];
    corporateInputValues: string[];
    individualInputValues: string[];
    switchRatios: string[];
    gotoPaymentPageButtonName: string;
    checkBoxAcceptanceLab: string;
}
interface PaymentPageSettings {
    path: string;
    gotoPayPageButtonName: string;
    applePayName: string;
    payByLinkName: string;
    pinPayName: string;
    freeLab: string;
}
interface PayControllerPageSettings {
    path: string;
    prodPath: string;
}
interface OrderSuccessPageSettings {
    path: string;
}
interface OrderFailedPageSettings {
    path: string;
    gotoPaymentPageButtonLab: string;
}
interface WebsiteSettings {
    baseUrl: string;
    passWord: string;
    paymentToken: string;
    cookiesAcceptButtonName: string;
    productListerSlug: string;
    productSlug: string;
    extraOptionProductSlug: string;
    categoryPage: CategoryPageSetting;
    productListerPage: ProductListerPageSettings;
    productDetailPage: ProductDetailPageSettings;
    cartOverviewPage: CartOverviewPageSettings;
    customerDetailsPage: CustomerDetailsPageSettings
    paymentPage: PaymentPageSettings;
    payControllerPage: PayControllerPageSettings;
    orderSuccessPage:OrderSuccessPageSettings;
    orderFailedPage: OrderFailedPageSettings;
}

//settings for pages in NL
const websiteSettingsNL = {
    baseUrl: process.env.BASE_URL as string,
    passWord: process.env.PASSWORD as string,
    paymentToken: process.env.PAYMENT_TOKEN as string,

    cookiesAcceptButtonName: "Alles accepteren",
    
    productListerSlug: "blokhut-3x2",
    productSlug: "picknicktafel-gadero",
    extraOptionProductSlug: "blokhut-minimodern",

    categoryPage:{
        path: "blokhut-afmetingen/",
        categoryCardPattern: "Blokhut circa 3x2 meter.*",
        //productListerSlug: "blokhut-3x2",
    },
    productListerPage: {
        productCardPattern: ".*Blokhut Minimodern.*",
        //productSlug: "blokhut-minimodern",
        productCountLab: "producten",
    },
    productDetailPage: {
        addToCartButtonName: "In winkelwagen",
        gotoCartButtonName: "Ga naar winkelwagen",
    },
    cartOverviewPage: {
        path: "winkelwagen/",
        addrEditLab: 'Wijzigen',
        gotoCustomerPageButtonName: 'Volgende stap',
        shippingOptionLab: "Laten bezorgen",
        addrInputPlaceholder: "Vul hier je postcode en huisnummer in"
    },
    customerDetailsPage: {
        path: "checkout/customer-details/",
        corporateInputFields: ["#companyName", "#kvkNumber", "#vatNumber", "#firstName", "#lastName", "#email", "#phone", "#comments"],
        individualInputFields:  ["#firstName", "#lastName", "#email", "#phone", "#comments"],
        corporateInputValues: ["rb2", "kvk123", "DE9876543210", "jennifer", "chen", "jennifer@rb2.nl", "14598768572", "test"],
        individualInputValues: ["jennifer", "chen", "jennifer@rb2.nl", "14598768572", "test"],
        switchRatios:  ["Particulier", "Bedrijf"],
        gotoPaymentPageButtonName: "Ga naar stap 2: Betaling",
        checkBoxAcceptanceLab: "Ik heb de algemene voorwaarden gelezen en ik ga hiermee akkoord. Eveneens heb ik mijn gegevens gecontroleerd"
    },
    paymentPage: {
        path: "checkout/payment/",
        gotoPayPageButtonName: "Betaal je bestelling",
        applePayName: "Apple Pay",
        payByLinkName: "Pay by Link",
        pinPayName:"PIN",
        freeLab: "gratis",
    },
    payControllerPage: {
        path: "controllers/payments/",
        prodPath: "safe.pay.nl/payment" //Apple Pay controller payment page
    },
    orderSuccessPage: {
        path: "checkout/thank-you/"
    },
    orderFailedPage: {
        path: "checkout/failure/",
        gotoPaymentPageButtonLab:"Betaal je bestelling",
    },
};

//settings for pages in BE
const websiteSettingsBE = {
    baseUrl: process.env.BASE_URL_BE as string,
    passWord: process.env.PASSWORD as string,
    paymentToken: process.env.PAYMENT_TOKEN as string,

    cookiesAcceptButtonName: "Alles accepteren",
    
    productListerSlug: "blokhut-3x2",
    productSlug: "picknicktafel-gadero",
    extraOptionProductSlug: "blokhut-minimodern",

    categoryPage:{
        path: "blokhut-afmetingen/",
        categoryCardPattern: "Blokhut circa 3x2 meter.*",
        //productListerSlug: "blokhut-3x2",
    },
    productListerPage: {
        productCardPattern: ".*Blokhut Minimodern.*",
        //productSlug: "blokhut-minimodern",
        productCountLab: "producten",
    },
    productDetailPage: {
        addToCartButtonName: "In winkelwagen",
        gotoCartButtonName: "Ga naar winkelwagen",
    },
    cartOverviewPage: {
        path: "winkelwagen/",
        addrEditLab: 'Wijzigen',
        gotoCustomerPageButtonName: 'Volgende stap',
        shippingOptionLab: "Laten bezorgen",
        addrInputPlaceholder: "Vul hier je adres in"
    },
    customerDetailsPage: {
        path: "checkout/customer-details/",
        corporateInputFields: ["#companyName", "#kvkNumber", "#vatNumber", "#firstName", "#lastName", "#email", "#phone", "#comments"],
        individualInputFields:  ["#firstName", "#lastName", "#email", "#phone", "#comments"],
        corporateInputValues: ["rb2", "kvk123", "DE9876543210", "jennifer", "chen", "jennifer@rb2.nl", "14598768572", "test"],
        individualInputValues: ["jennifer", "chen", "jennifer@rb2.nl", "14598768572", "test"],
        switchRatios:  ["Particulier", "Bedrijf"],
        gotoPaymentPageButtonName: "Ga naar stap 2: Betaling",
        checkBoxAcceptanceLab: "Ik heb de algemene voorwaarden gelezen en ik ga hiermee akkoord. Eveneens heb ik mijn gegevens gecontroleerd"
    },
    paymentPage: {
        path: "checkout/payment/",
        gotoPayPageButtonName: "Betaal je bestelling",
        applePayName: "Apple Pay",
        payByLinkName: "Pay by Link",
        pinPayName:"PIN",
        freeLab: "gratis",
    },
    payControllerPage: {
        path: "controllers/payments/",
        prodPath: "safe.pay.nl/payment" //Apple Pay controller payment page
    },
    orderSuccessPage: {
        path: "checkout/thank-you/"
    },
    orderFailedPage: {
        path: "checkout/failure/",
        gotoPaymentPageButtonLab:"Betaal je bestelling",
    },
};

//settings for pages in FR
const websiteSettingsFR = {
    baseUrl: process.env.BASE_URL_FR as string,
    passWord: process.env.PASSWORD as string,
    paymentToken: process.env.PAYMENT_TOKEN as string,
    cookiesAcceptButtonName: "Accepter tout",

    productListerSlug: "palissade-destockage",
    productSlug: "table-de-pique-nique-en-epicea-impregne-gadero",
    extraOptionProductSlug: "abri-de-jardin-hamar-l-type-7-690-x-395-cm-cloisons-noires",

    categoryPage:{
        path: "soldes-chez-gadero/",
        categoryCardPattern: "palissade Red class wood Déstockage de nos lames de palissade.*",
        //productListerSlug: "palissade-destockage",
    },
    productListerPage: {
        productCardPattern: ".*Meleze Douglas Rabote 690 x 395 x 348 cm.*",
        //productSlug: "abri-de-jardin-hamar-l-type-7-690-x-395-cm-cloisons-noires"，
        productCountLab:"produits",
    },
    productDetailPage: {
        addToCartButtonName: "Ajouter au panier",
        gotoCartButtonName: "Aller vers le panier",
    },
    cartOverviewPage: {
        path: "panier/",
        addrEditLab: 'Modifier',
        gotoCustomerPageButtonName: 'Suivant',
        shippingOptionLab: "Livraison à domicile",
        addrInputPlaceholder: "Ville, rue ou code postal"
    },
    customerDetailsPage: {
        path: "checkout/customer-details/",
        corporateInputFields: ["#companyName", "#kvkNumber", "#vatNumber", "#firstName", "#lastName", "#email", "#phone", "#comments"],
        individualInputFields:  ["#firstName", "#lastName", "#email", "#phone", "#comments"],
        corporateInputValues: ["rb2", "kvk123", "DE9876543210", "jennifer", "chen", "jennifer@rb2.nl", "14598768572", "test"],
        individualInputValues: ["jennifer", "chen", "jennifer@rb2.nl", "14598768572", "test"],
        switchRatios:  ["Particulier", "Société"],
        gotoPaymentPageButtonName: "Aller à l\'étape 2: Paiement",
        checkBoxAcceptanceLab: "J\'ai lu les conditions générales et je les accepte. J’ai également contrôlé que les informations que j’ai indiquées sont correctes.",
    },
    paymentPage: {
        path: "checkout/payment/",
        gotoPayPageButtonName: "Payez votre commande",
        applePayName: "Apple Pay",
        payByLinkName: "Pay by Link",
        pinPayName:"PIN",
        freeLab: "gratuit",
    },
    payControllerPage: {
        path: "controllers/payments/",
        prodPath: "safe.pay.nl/payment" //Apple Pay controller payment page
    },
    orderSuccessPage: {
        path: "checkout/thank-you/"
    },
    orderFailedPage: {
        path: "checkout/failure/",
        gotoPaymentPageButtonLab:"Payez votre commande",
    },
};

//settings for pages in DE 
const websiteSettingsDE = {
    baseUrl: process.env.BASE_URL_DE as string,
    passWord: process.env.PASSWORD as string,
    paymentToken: process.env.PAYMENT_TOKEN as string,
    cookiesAcceptButtonName: "Alle zulassen",

    productListerSlug: "blockhaus-28mm-wandstaerke",
    productSlug: "picknicktisch-impraegniert-und-getrocknet-holz-180-x-155-x-74-cm",
    extraOptionProductSlug: "ueberdachung-hamar-l-typ-7-schwarz",

    categoryPage:{
        path: "soldes-chez-blockhaeuser-nach-wandstaerken-eingeteilt/",
        categoryCardPattern: "asset Blockhaus Wandstärke 28 mm.*",
        //productListerSlug: "blockhaus-28mm-wandstaerke",
    },
    productListerPage: {
        productCardPattern: ".*Uberdachung mit Abstellraum Satteldach Hamar L Typ 7.*",
        //productSlug: "ueberdachung-hamar-l-typ-7-schwarz",
        productCountLab: "Produkte",
    },
    productDetailPage: {
        addToCartButtonName: "In den Warenkorb",
        gotoCartButtonName: "Zum Warenkorb",
    },
    cartOverviewPage: {
        path: "einkaufswagen/",
        addrEditLab: 'Ändern',
        gotoCustomerPageButtonName: 'Nächste',
        shippingOptionLab: "Liefern lassen",
        addrInputPlaceholder: "Ort, Straße oder Postleitzahl"
    },
    customerDetailsPage: {
        path: "checkout/customer-details/",
        corporateInputFields: ["#companyName", "#kvkNumber", "#vatNumber", "#firstName", "#lastName", "#email", "#phone", "#comments"],
        individualInputFields:  ["#firstName", "#lastName", "#email", "#phone", "#comments"],
        corporateInputValues: ["rb2", "kvk123", "DE9876543210", "jennifer", "chen", "jennifer@rb2.nl", "14598768572", "test"],
        individualInputValues: ["jennifer", "chen", "jennifer@rb2.nl", "14598768572", "test"],
        switchRatios:  ["Privatperson", "Firma"],
        gotoPaymentPageButtonName: "Weiter zu Schritt 2: Zahlung",
        checkBoxAcceptanceLab: "Ich habe die AGB sowie die Widerrufsbelehrung gelesen und stimme ihnen zu. Darüber hinaus habe ich meine Daten überprüft.",
    },
    paymentPage: {
        path: "checkout/payment/",
        gotoPayPageButtonName: "Bezahlen Sie Ihre Bestellung",
        applePayName: "Apple Pay",
        payByLinkName: "Pay by Link",
        pinPayName:"PIN",
        freeLab: "kostenlos",
    },
    payControllerPage: {
        path: "controllers/payments/",
        prodPath: "safe.pay.nl/payment" //Apple Pay controller payment page
    },
    orderSuccessPage: {
        path: "checkout/thank-you/"
    },
    orderFailedPage: {
        path: "checkout/failure/",
        gotoPaymentPageButtonLab:"Bezahlen Sie Ihre Bestellung",
    },
};

//get website settings by language
function getWebsiteSettings() {
    const lang: string = process.env.LANG as string; 
    if (lang == "FR") 
        return websiteSettingsFR;
    else if (lang == "DE") 
        return websiteSettingsDE;
    else if (lang == "BE")
        return websiteSettingsBE;
    return websiteSettingsNL;
}
// define some basic config data 
export const websitSettings = getWebsiteSettings() as WebsiteSettings;


 