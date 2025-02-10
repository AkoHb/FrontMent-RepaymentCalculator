// load default settings and error messages data
import defaultValues from "../config/defaultValues";
import ErrorMsgs from '../config/errorsMsgs.json';
import Ways from "../config/ways.json"

// Get valid language from 'json' file witl all data
const languages = require('../config/lang.json');

/**
 * The `getValidTextValue` function used to return the current text value from language based on array of keys
 * 
 * @param { Array }  pathArray - path to text field into language object
 * @param { String } language - current language value (default = 'en')
 */

export default function getValidTextValue(pathArray, language = defaultValues.preloadLanguage) {

    const defLang = defaultValues.preloadLanguage;
    
    if (!Array.isArray(pathArray) || pathArray.length === 0) {
        return ErrorMsgs.languageTitle;
    }
    
    const getValue = (curLang) => {
        const langObj = languages[curLang];
        if (!langObj) return undefined;

        return pathArray.reduce((way, key) => (way && way[key] !== undefined ? way[key] : undefined), langObj);
    };



    return getValue(language) || getValue(defLang) || ErrorMsgs.languageTitle;
}
