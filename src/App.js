// add configuration settings
import React, { useEffect } from "react";
import defaultValues from "./config/defaultValues";
import GetBlockMinValues from "./utils/getBlockMinValues";
import ResultField from "./components/Result/resultField";
import UserInputField from "./components/UserInput/userInputField";
import CreateDynamicStyles from "./components/InputAndButton/inputAndButton";
import "./App.scss";

// add the languages library
const languages = require("./config/lang.json");

/**
 *
 * @param { String } lang  - lang passed or from the browser config or by user select (buttons at the top of the form)
 *
 * The function:
 * - get the valid currency array by language
 * - try to filter it by full name like "en-US", "en-GB" and etc.
 * - if it's empty, get the first array
 * - try to get current char
 * - if not - the default one ("$")
 *
 * @returns { String } - with current or default currency sign
 */
const getDefaultCurrencyByLang = lang => {
    const getChar = (l, c) => {
        try {
            return new Intl.NumberFormat(l, {
                style: "currency",
                currency: c,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(0);
        } catch (e) {
            return "$";
        }
    };

    const currentArray = Object.keys(languages);

    // check, if the lang data fully equal to currency name ( 'en-GB' === 'en-GB' )
    // if not, get the first value

    let validCurrencyData = currentArray.filter((array) => array[0] === lang);

    if (validCurrencyData.length === 0) {
        validCurrencyData = currentArray[0];
    }

    return getChar(validCurrencyData[0], validCurrencyData[1]);
};

export default function App() {

    const [state, setState] = React.useState({
        currentLanguage: null,
        currentCurrency: null,
        paymentCount: 0,
        timeUnit: "year", // 'day','month' or 'year'
        termCount: 0,
        interestRateInterval: "month", // 'day', 'month' or 'year'
        interestRate: 0,
        isError: false,
        monthlyPayment: 0,
        totalPayment: 0,
        mortgageType: "",
    });

    // console.debug(state);

    useEffect(() => {
        const browserLang = languages.hasOwnProperty(
            navigator.languages[0].split("-")[0]
        )
            ? navigator.languages[0].split("-")[0]
            : defaultValues.preloadLanguage;

        console.debug(`User used the '${browserLang}' language into the browser.`);

        setState((prev) => ({
            ...prev,
            currentLanguage:
                prev.currentLanguage !== browserLang
                    ? browserLang
                    : prev.currentLanguage,
            currentCurrency: getDefaultCurrencyByLang(navigator.languages[0]),
        }));
    }, []);

    // update the language if the user changed it
    useEffect(() => {
        setState((prev) => ({
            ...prev,
            currentCurrency: getDefaultCurrencyByLang(state.currentLanguage),
        }));
    }, [state.currentLanguage]);

    CreateDynamicStyles(`
      #container {
        display: grid;
        minWidth: ${GetBlockMinValues()[0]}px;
        gridTemplateColumns: repeat(2, minmax(${
            GetBlockMinValues()[0]
        }px, 1fr));
      }
    `);

    return (
        <div id="container" key="container-key">
            <UserInputField {...{ state, setState }} />
            <ResultField {...{ state }} />
        </div>
    );
}
