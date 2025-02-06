// load еру default settings to avoid errors
import defaultValues from "../config/defaultValues";

// also add file with error messages
let ErrorMSG = require("../config/errorsMsgs.json");

// Get valid language from 'json' file and fill the valid fields into form
const languages = require("../config/lang.json");

const getCurrencyChar = (locate, currency, lang) => {
    try {
        return (0)
            .toLocaleString(locate, {
                style: "currency",
                currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            })
            .replace(/\d/g, "")
            .trim();
    } catch (error) {
        if (typeof locate !== "string") {
            console.debug(
                ErrorMSG.invalidType.replace(
                    "{val}",
                    `locate(${lang})`.toLowerCase()
                )
            );
        } else if (typeof currency !== "string") {
            console.debug(
                ErrorMSG.invalidType.replace(
                    "{val}",
                    `currency(${lang})`.toLowerCase()
                )
            );
        } else if (locate.length < 4) {
            console.debug(
                ErrorMSG.invalidLength.replace(
                    "{val}",
                    `locate(${lang})`.toLowerCase()
                )
            );
        } else if (currency.length < 1) {
            console.debug(
                ErrorMSG.invalidLength.replace(
                    "{val}",
                    `currency(${lang})`.toLowerCase()
                )
            );
        } else {
            console.debug(ErrorMSG.catchMSG.replace("{error}", error.message));
        }
        return "";
    }
};

/**
 * The function used to return unique currency chars or default value
 *
 * The function:
 * - take all information from language library
 * - if there enough info, processing and filter values
 * - if it isn't enough, used the value by sefault settings
 *
 * @returns { Array } - [{text: "S", value: "USD"}, ...] - return array with objects
 */
export default function getCurrencyChars() {
    let result = [];

    Object.keys(languages).forEach((langKey) => {
        languages[langKey]?.currencyValue.forEach(([locale, currency]) => {
            const symbol = getCurrencyChar(locale, currency, langKey);
            if (symbol) {
                result.push({
                    text: symbol,
                    value: currency,
                });
            }
        });
    });

    if (result.length === 0) {
        const [locale, currency] = defaultValues.currency;
        const symbol = getCurrencyChar(
            locale,
            currency,
            defaultValues.preloadLanguage
        );
        result.push({ text: symbol, value: currency });
    }

    const uniqueCurrencies = Array.from(
        new Map(result.map((item) => [item.value, item])).values()
    );

    return uniqueCurrencies;
}
