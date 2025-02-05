module.exports =  {
    preloadLanguage: "en",              // used, when the browser can't return the valid language or it isn't into libruary
    langButtonsCount: 3,                // count language buttons at the top of the user block
    minColumnSize: 150,                 // declare min size to 150px to correct display on small screens
    minColumnHeight: 400,
    currency: ["en-US", "USD"],         // use like default sign to currency
    termButton: "years",                // used to set valid term during loading the page
    rate: ["%", "y"],                   // use to set the year rate or month (["%", "m"])
    type: 'type-rep',                   // use to set selected radio input'type-rep' or 'type-int'
    submitText: "Calculate Repayments", // use the default 'en' value
    monthlyPayment: "1500.00",          //
    totalPayment: 1,                    //
}