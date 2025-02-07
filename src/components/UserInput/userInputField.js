import React from "react";
// load еру default settings to avoid errors
import defaultValues from "../../config/defaultValues";

// also load current configuration file and get the values from it
import config from "../../config/config";

// import calc icon
import CalcIcon from "../../assets/images/icon-calculator.svg";

// import func to fill the buttons data
import GetLangBtnBlock from "../../utils/getLangBtnBlock";
import GetCurrencyChars from "../../utils/getCurrencyChars";
import GetTempData from "../../utils/getTempData";
import GetRateData from "../../utils/getRateData";
import GetBlockMinValues from "../../utils/getBlockMinValues";

// import custom react component and fill it
import CreateInputAndButton from "../InputAndButton/inputAndButton";

// import radio input constructor
import CreateRadioInput from "../RadioInput/createRadioInput";

// import the func to fill the data for inputAndButton block
import GenerateFieldConfig from "../../utils/generateFieldConfig";

// also add file with error messages
let ErrorMSG = require("../../config/errorsMsgs.json");

// Get valid language from 'json' file and fill the valid fields into form
const languages = require("../../config/lang.json");

// list of input + button blocks
const blocksName = [
    ["currency", "left"],
    ["term", "right"],
    ["rate", "right"],
];

// hold there the data for radio inputs
const radioDataButtons = [
    {
        input: { id: "repaiment", classes: "" },
        label: { key: "repaiment", classes: "" }
    },
    {
        input: { id: "interest", classes: "" },
        label: { key: "interestOnly", classes: "" }
    },
];






export default function UserInputField({ state, setState }) {
    // console.log([getLanguages(), defaultValues.langButtonsCount]);
    // console.debug(GetCurrencyChars());

    const termArray = React.useMemo(
        () => GetTempData(state.termCount, state.currentLanguage),
        [state.termCount, state.currentLanguage]
    );
    const rateArray = React.useMemo(
        () => GetRateData(state.currentLanguage),
        [state.currentLanguage]
    );
    
    // handle functions
    const handleChangeLanguage = (e) => {
        console.log(e.target.value);
        setState(prev => ({...prev, currentLanguage: e.target.value}))
    };
    
    const handleChangeAmount = () => {};
    const handleClickAmount = () => {};
    
    const handleChangeTerm = () => {};
    const handleClickTerm = () => {};
    
    const handleChangeRate = () => {};
    const handleClickRate = () => {};
    
    // end handle functions

    const data = {
        currency: {
            attr: GenerateFieldConfig(
                "amount",
                config.minAmount,
                config.maxAmount,
                config.placeholderAmount,
                handleChangeAmount,
                handleClickAmount
            ),
            array: GetCurrencyChars(),
        },
        term: {
            attr: GenerateFieldConfig(
                "term",
                config.minTerm,
                config.maxTerm,
                config.placeholderTerm,
                handleChangeTerm,
                handleClickTerm
            ),
            array: termArray,
        },
        rate: {
            attr: GenerateFieldConfig(
                "rate",
                config.minRate,
                config.maxRate,
                config.placeholderRate,
                handleChangeRate,
                handleClickRate,
                0.01
            ),
            array: rateArray,
        },
    };


    return (
        <div
            id="user-input-block"
            key="user-input-block-key"
            style={{
                minWidth: GetBlockMinValues()[0],
            }}
            aria-label={
                languages[state.currentLanguage]?.userInputForm.ariaLabels
                    .userInputBlock || ErrorMSG.ariaLabel
            }
        >
            <GetLangBtnBlock onClick={handleChangeLanguage} />
            <form
                className="user-data-input"
                key="form-key"
                aria-label={
                    languages[state.currentLanguage]?.userInputForm.ariaLabels
                        .form || ErrorMSG.ariaLabel
                }
            >
                <h2 id="title" className="mUItext" key="form-title-key">
                    {languages[state.currentLanguage]?.userInputForm.title ||
                        ErrorMSG.languageTitle}
                </h2>
                <button
                    id="clear-form"
                    key="clear-form-key"
                    className="sUItext"
                    aria-label={
                        languages[state.currentLanguage]?.userInputForm
                            .ariaLabels.clearButton || ErrorMSG.ariaLabel
                    }
                >
                    {languages[state.currentLanguage]?.userInputForm
                        .clearButton || ErrorMSG.invalidName}
                </button>
                <div key="user-input-data-block-key">
                    <div id="decimal-input-block" key="decimal-input-block-key">
                        {blocksName.map(([key, buttonPosition]) => (
                            <CreateInputAndButton
                                key={key}
                                parentState={state}
                                setParentState={setState}
                                data={data[key].attr}
                                arrayWithObjects={data[key].array}
                                buttonPosition={buttonPosition}
                            />
                        ))}
                    </div>
                    <div id="type-radio" key="type-radio-key">
                        <h4
                            id="header-radio-title"
                            key="header-radio-title-key"
                            className="sUItext"
                        >
                            {languages[state.currentLanguage]?.userInputForm
                                .userInput.mortgageType.type ||
                                ErrorMSG.invalidName}
                        </h4>
                        {
                            radioDataButtons.map(data => CreateRadioInput(data, state.currentLanguage))
                        }
                    </div>
                    <button
                        id="submit-btn"
                        key="submit-btn-key"
                        type="submit"
                        className="light-bg mUItext"
                        aria-label={
                            languages[state.currentLanguage]?.userInputForm
                                .ariaLabels.submit || ErrorMSG.ariaLabel
                        }
                        value={defaultValues.submitText}
                    >
                        <img src={CalcIcon} alt="Calculator icon" />
                        {/* <span> */}
                            {languages[state.currentLanguage]?.userInputForm
                                .calculateButtonText || ErrorMSG.invalidName}
                        {/* </span> */}
                    </button>
                </div>
            </form>
        </div>
    );
}
