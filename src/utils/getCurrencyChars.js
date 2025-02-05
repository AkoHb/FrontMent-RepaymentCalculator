// load еру default settings to avoid errors
import defaultValues from '../config/defaultValues';

// also add file with error messages
let ErrorMSG = require('../config/errorsMsgs.json');

// Get valid language from 'json' file and fill the valid fields into form
const languages = require('../config/lang.json');

const getCurrencyChar = (locate, currency, lang) => {
    
    try {
        return (0).toLocaleString(locate, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/\d/g, '').trim()
    } catch (error){

        if ( typeof locate !== 'string' ) {
            console.debug(ErrorMSG.invalidType.replace('{val}', `locate(${lang})`.toLowerCase()));
        } else if ( typeof currency !== 'string' ) {
            console.debug(ErrorMSG.invalidType.replace('{val}', `currency(${lang})`.toLowerCase()));
        } else if (locate.length < 4) {
            console.debug(ErrorMSG.invalidLength.replace('{val}', `locate(${lang})`.toLowerCase()));
        } else if (currency.length < 1) {
            console.debug(ErrorMSG.invalidLength.replace('{val}', `currency(${lang})`.toLowerCase()));
        } else {
            console.debug(ErrorMSG.catchMSG.replace('{error}', error.message));
        }
        return "";
    }
}

/**
 * The function used to return unique currency chars or default value
 * 
 * The function:
 * - take all information from language library
 * - if there enough info, processing and filter values
 * - if it isn't enough, used the value by sefault settings
 * 
 * @returns { Array } - [[lang, char], ...] - lang used to valid label
 */
export default function getCurrencyChars () {

    let result = Object.keys(languages).flatMap(langKey =>
        languages[langKey]?.currencyValue.map(arr => [langKey, getCurrencyChar(arr[0], arr[1], langKey)])
    );

    if (result.length >= 1) {
        result = Array.from(new Map(result.map(([lang, sign]) => [sign, [lang, sign]])).values());
    } else {
        result = [[defaultValues.preloadLanguage, getCurrencyChar(defaultValues.currency[0], defaultValues.currency[1], defaultValues.preloadLanguage)]];
    }

    // console.debug(result);
    return result;
};
