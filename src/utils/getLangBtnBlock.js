// load the default settings to avoid errors
import defaultValues from '../config/defaultValues';

// also load current configuration file and get the values from it
import config from '../config/config';

// also load the array with error messages
const ErrorMSG = require('../config/errorsMsgs.json');

// Get valid language from 'json' file and fill the valid fields into form
const languages = require('../config/lang.json');

// get all languages and sort them by usage count
const getLanguages = () => Object.keys(languages).sort((l1, l2) => (languages[l2]?.usageCount ?? 0) - (languages[l1]?.usageCount ?? 0));

/**
 * The `getLangBtnBlock` fill the top section to select language by user opinion
 * 
 * the function: 
 * - check json file to valid languages and sort them by usage count
 * - usage count increase every time, like user push the button calculate result
 * - it's synamical value
 * - if there are no languages show the string in English
 */

export default function getLangBtnBlock({onClick}) {
    
    const blockWidth = ( !config.languageButtons.minColumnSize  || config.languageButtons.minColumnSize < defaultValues.minColumnSize )
        ? defaultValues.minColumnSize
        : config.languageButtons.minColumnSize;

    const sliceArray = ( !config.languageButtons.langButtonsCount || config.languageButtons.langButtonsCount < defaultValues.languageButtons)
        ? defaultValues.languageButtons
        : config.languageButtons.langButtonsCount

    const buttonsData = getLanguages();

    let fillData;

    if (buttonsData.length >= 2) {
        fillData = buttonsData
            .slice(0, sliceArray)
            .map(language =>(
                <button
                    id={language}
                    key={language}
                    value={language}
                    aria-label={languages[language]?.fullNameLang || ErrorMSG.languageTitle}
                    title={languages[language]?.fullNameLang || ErrorMSG.languageTitle}
                    onClick={onClick}
                >
                    {language}
                </button>
                )
            )
    } else {
        fillData = [<p key={crypto.randomUUID()}>{ErrorMSG.langMessage}</p>];
    }

    return (
        <>
            <div 
                id='user-lang-select'
                aria-label="Use to select correct page language"
                style={{
                    display : "flex",
                    minWidth : blockWidth,
                    justifyContent : "space-evenly",
                    alignItems: "center"     
                }}
                >
                {fillData}
            </div>
        </>
    )
}