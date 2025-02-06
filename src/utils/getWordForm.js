// Get valid language from 'json' file witl all data
const languages = require('../config/lang.json');

/**
 * The function `getWordForm` used to return the correct word form by amount
 * 
 * @param { Number | String } inputValue - value, passed from form that user fill himself
 * @param { String } wordKey - value, passed from form. Depend from user choice (months or years)
 * @param { lang } lang - passed value by analize the browser languase or user choice
 * 
 * @returns { String } - with correct name or name by default lamguage (English = 'en')
*/
export default function getWordForm (inputValue, wordKey, lang) {
    
    const num = parseInt(inputValue, 10);

    if (isNaN(num) || num === 0) {
        const forms = languages[lang]?.userInputForm?.userInput?.wordForms[wordKey];
        return forms ? forms[forms.length - 1] : wordKey;
    }

    const forms = languages[lang]?.userInputForm?.userInput?.wordForms[wordKey];
    
    if (!forms) return wordKey;

    if (lang === "ru") {
        if (num % 10 === 1 && num % 100 !== 11) return forms[0]; // 1 месяц, 1 год
        if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) return forms[1]; // 2-4 месяца, 2-4 года
        return forms[2]; // 5+ месяцев, 5+ лет
    }

    return num === 1 ? forms[0] : forms[1];
};
