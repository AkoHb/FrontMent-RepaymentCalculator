// load еру default settings to avoid errors
import defaultValues from '../config/defaultValues';

// Get valid language from 'json' file witl all data
const languages = require('../config/lang.json');

// 
const getRate = arr => arr.length === 2 && arr[0] === '%' && typeof arr[1] === 'string' 
    ? (<span>{arr[0]}<sub>{arr[1]}</sub></span>)
    : (<span>%</span>)

/**
 * create the function to parse the language data and hold the buttons keys (text, values)
 * @returns { Array } - will return the array with valid info based by selected language [{ value: "year", text: React-element}, ...]
 */
export default function getRateData ( currentLanguage = defaultValues.preloadLanguage ) {
   
    let result = [];

    let currentData = Object.keys(languages[currentLanguage]?.userInputForm?.userInput?.wordForms || {});

    if ( currentData.length > 1 ) {
        currentData.forEach(rate => {
            let char = currentData?.rate?.at(-1) 
                ? currentData.rate.at(-1).toLowerCase() 
                : rate.toLowerCase();
            result.push({
                value: rate,
                text: getRate(["%", char])
            })
        });
    }
    // console.debug(result);
    return result;
}
