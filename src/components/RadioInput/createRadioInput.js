// load the default settings to avoid errors
import defaultValues from "../../config/defaultValues";

// also add file with error messages
let ErrorMSG = require("../../config/errorsMsgs.json");

// Get valid language from 'json' file and fill the valid fields into form
const languages = require("../../config/lang");

/**
 *  The function used to unify the radio inputs
 * 
* @param { Object } data - object with valid tags attributes
 * @param { String } language - pass the current language or the default 
 * @returns { JSX } - return the JSX Object
 */
export default function createRadioInput(
    data,
    language = defaultValues.preloadLanguage
) {
    const defaultLang = defaultValues.preloadLanguage;

    const labelText =
        languages?.[language]?.userInputForm?.userInput?.mortgageType?.[
            data?.label?.key
        ] ||
        languages?.[defaultLang]?.userInputForm?.userInput?.mortgageType?.[
            data?.label?.key
        ] ||
        ErrorMSG.invalidName;

    const inputId = data?.input?.id || "invalid-id";
    const labelClasses = data?.label?.classes || "";
    const inputClasses = data?.input?.classes || "";

    return (
        <label htmlFor={inputId} className={`mUItext ${labelClasses}`}>
            <input
                id={`radio-${inputId}`}
                className={`light-bg ${inputClasses}`}
                key={`radio-${inputId}-key`}
                type="radio"
                required
            />
            {labelText}
        </label>
    );
}
