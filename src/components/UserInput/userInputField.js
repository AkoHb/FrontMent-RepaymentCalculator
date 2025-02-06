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

// import custom react component and fill it
import CreateInputAndButton from "../InputAndButton/inputAndButton";

// import the func to fill the data for inputAndButton block
import GenerateFieldConfig from "../../utils/generateFieldConfig";

// also add file with error messages
let ErrorMSG = require("../../config/errorsMsgs.json");

// Get valid language from 'json' file and fill the valid fields into form
const languages = require("../../config/lang.json");

const handleChangeLanguage = (e) => {
    console.log(e.target.value);
};

const handleChangeAmount = () => {};
const handleClickAmount = () => {};

const handleChangeTerm = () => {};
const handleClickTerm = () => {};

const handleChangeRate = () => {};
const handleClickRate = () => {};

export default function UserInputField({ state, setState }) {
    // console.log([getLanguages(), defaultValues.langButtonsCount]);
    // console.debug(GetCurrencyChars());

    const blocksName = [
        ["currency", "left"],
        ["term", "right"],
        ["rate", "right"],
    ];

    const termArray = React.useMemo(
        () => GetTempData(state.termCount, state.currentLanguage),
        [state.termCount, state.currentLanguage]
    );
    const rateArray = React.useMemo(
        () => GetRateData(state.currentLanguage),
        [state.currentLanguage]
    );

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
                handleClickRate
            ),
            array: rateArray,
        },
    };

    return (
        <div
            id="user-input-block"
            key="user-input-block-key"
            aria-label={
                languages[state.currentLanguage]?.userInputForm.ariaLabels
                    .userInputBlock || ErrorMSG.ariaLabel
            }
        >
            <GetLangBtnBlock onClick={handleChangeLanguage} />
            <form
                className="user-data-input"
                aria-label={
                    languages[state.currentLanguage]?.userInputForm.ariaLabels
                        .form || ErrorMSG.ariaLabel
                }
            >
                <h3 id="title" className="mUItext">
                    {languages[state.currentLanguage]?.userInputForm.title ||
                        ErrorMSG.languageTitle}
                </h3>
                <button
                    id="clear-form"
                    className="sUItext"
                    aria-label={
                        languages[state.currentLanguage]?.userInputForm
                            .ariaLabels.clearButton || ErrorMSG.ariaLabel
                    }
                >
                    {languages[state.currentLanguage]?.userInputForm
                        .clearButton || ErrorMSG.invalidName}
                </button>
                <div>
                    <div id="decimal-input-block" key="decimal-input-block-key">
                        {blocksName.map(([key, buttonPosition]) => (
                            <CreateInputAndButton
                                key={key}
                                lang={state.currentLanguage}
                                data={data[key].attr}
                                arrayWithObjects={data[key].array}
                                buttonPosition={buttonPosition}
                            />
                        ))}
                    </div>
                    <div id="type-radio" key="type-radio-key">
                        <label
                            htmlFor="type-money"
                            className="label-name sUItext"
                        >
                            {languages[state.currentLanguage]?.userInputForm
                                .userInput.mortgageType.type ||
                                ErrorMSG.invalidName}
                        </label>
                        <label
                            htmlFor="type-rep"
                            className="label-name mUItext"
                        >
                            <input
                                id="type-rep"
                                className="light-bg"
                                key="type-rep-key"
                                type="radio"
                                checked={defaultValues.type === "type-rep"}
                            ></input>
                            {languages[state.currentLanguage]?.userInputForm
                                .userInput.mortgageType.repaiment ||
                                ErrorMSG.invalidName}
                        </label>
                        <label
                            htmlFor="type-int"
                            className="label-name mUItext"
                        >
                            <input
                                id="type-rep"
                                className="light-bg"
                                key="type-int-key"
                                type="radio"
                                checked={defaultValues.type === "type-int"}
                            ></input>
                            {languages[state.currentLanguage]?.userInputForm
                                .userInput.mortgageType.interestOnly ||
                                ErrorMSG.invalidName}
                        </label>
                    </div>
                    <button
                        id="submit-btn"
                        type="submit"
                        className="light-bg mUItext"
                        aria-label={
                            languages[state.currentLanguage]?.userInputForm
                                .ariaLabels.submit || ErrorMSG.ariaLabel
                        }
                        value={defaultValues.submitText}
                    >
                        <img src={CalcIcon} alt="Calculator icon" />
                        <span>
                            {languages[state.currentLanguage]?.userInputForm
                                .calculateButtonText || ErrorMSG.invalidName}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
}
