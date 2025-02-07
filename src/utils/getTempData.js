// load еру default settings to avoid errors
import defaultValues from "../config/defaultValues";

// import func to get valid button text based by count (user input value)
import GetWordForm from './getWordForm';

// also add file with error messages
let ErrorMSG = require("../config/errorsMsgs.json");

// Get valid language from 'json' file and fill the valid fields into form
const languages = require("../config/lang.json");

/**
 * 
 * @param { Number | String } count - The value from user input
 * @param { String } language - [language=defaultValues.preloadLanguage] - The current language or default (if undefined)
 * @returns { Array } - Returns an array of objects in format [{ text: "years", value: "year" }, ...] the text in depend from count (1 year, 2 years, ....)
 */

export default function getTempData(count, language = defaultValues.preloadLanguage) {
    
    const defaultLang = defaultValues.preloadLanguage;

    let wordForms = languages[language]?.userInputForm?.userInput?.wordForms;

    if (!wordForms) {
        console.debug(ErrorMSG.catchMSG.replace("{error}", `There is no valid data for '${language}', switching to '${defaultLang}'.`));
        language = defaultLang;
        wordForms = languages[language]?.userInputForm?.userInput?.wordForms || {};
    }

    const result = Object.keys(wordForms).map(time => ({
        value: time,
        text: GetWordForm(count, time, language)
    }));

    // console.debug(result);
    return result;
}