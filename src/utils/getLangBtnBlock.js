// load the default settings to avoid errors
import config from "../config/config";
import defaultValues from "../config/defaultValues";

import Ways from "../config/ways.json";
import GetValidTextValue from "./getValidTextValue";
import CreateDynamicStyles from "./createDynamicStyles";
import GetBlockMinValues from "./getBlockMinValues";

// also load the array with error messages
const ErrorMSG = require("../config/errorsMsgs.json");

// Get valid language from 'json' file and fill the valid fields into form
const languages = require("../config/lang.json");

// get all languages and sort them by usage count
const getLanguages = () =>
    Object.keys(languages).sort(
        (l1, l2) =>
            (languages[l2]?.usageCount ?? 0) - (languages[l1]?.usageCount ?? 0)
    );

/**
 * The `getLangBtnBlock` fills the top section to select language based on user input.
 * 
 * @param {object} state - The current state from the parent component.
 * @param {function} setState - The setState function from the parent component.
 * 
 * The function:
 * - Checks the JSON file for valid languages and sorts them by usage count.
 * - Filters out the current language from the list.
 * - Slices the array of languages based on the configuration setting.
 * - Increases the usage count each time the language selection button is clicked.
 * - Dynamically generates language selection buttons.
 * - If no valid languages are available, displays an error message in English.
 * 
 * @returns {JSX.Element} A JSX element that contains the language selection buttons or an error message if no languages are available.
 */

export default function getLangBtnBlock({ state, setState }) {
    
    const sliceArray =
        !config?.langButtonsCount ||
        config?.langButtonsCount < defaultValues.langButtonsCount
            ? defaultValues.langButtonsCount
            : config.langButtonsCount;

            
            const styleData = `
        #user-lang-select {
                    display : flex;
                    minWidth : ${GetBlockMinValues()[0]}px;
                    justifyContent : space-evenly;
                    alignItems: center;   
                }
    `;
    
    CreateDynamicStyles(styleData);

    const buttonsData = getLanguages().filter(
        lang => lang !== state.currentLanguage
    );
    
    let fillData;

    const handleChangeLanguage = e => {

      const prevLang = state.currentLanguage;
      const newLang = e.target.value;
      setState(prev => ({...prev, currentLanguage: newLang }));
      console.debug(`The language changed by user from '${prevLang}' to ${newLang}`);

    };

    if (buttonsData.length >= 2) {
        fillData = buttonsData.slice(0, sliceArray).map((language) => (
            <button
                id={language}
                key={`${language}-key`}
                value={language}
                aria-label={GetValidTextValue(Ways.fNl, language)}
                title={GetValidTextValue(Ways.fNl, language)}
                onClick={handleChangeLanguage}
            >
                {language}
            </button>
        ));
    } else {
        fillData = [
            <p key="invalid-language-data-key">{ErrorMSG.langMessage}</p>,
        ];
    }

    return (
        <>
            <div
                id="user-lang-select"
                key="user-lang-select-key"
                aria-label="Use to select correct page language"
            >
                {fillData}
            </div>
        </>
    );
}
