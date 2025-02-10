import React from "react";
// load еру default settings to avoid errors
import defaultValues from "../../config/defaultValues";

// also load current configuration file and get the values from it
import config from "../../config/config";

// import calc icon
import CalcIcon from "../../assets/images/icon-calculator.svg";
import Ways from "../../config/ways.json";
import GetValidTextValue from "../../utils/getValidTextValue";
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

// hold there the data for radio inputs
const radioDataButtons = [
    {
        key: "repayment",
        input: { id: "repayment", classes: "" },
        label: { key: "repayment", classes: "" }
    },
    {
        key: "interest",
        input: { id: "interest", classes: "" },
        label: { key: "interestOnly", classes: "" }
    },
];

export default function UserInputField({ state, setState }) {

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
            ),
            headerTextKey: "moneyAmount",
            containerAriaKey: "currencySelection",
            array: GetCurrencyChars(),
            inpStateKey: "paymentCount",
            btnStateKey: "currentCurrency",
            isButtonCheckedByText: true,
        },
        term: {
            attr: GenerateFieldConfig(
                "term",
                config.minTerm,
                config.maxTerm,
                config.placeholderTerm,
            ),
            headerTextKey: "term",
            containerAriaKey: "term",
            array: termArray,
            inpStateKey: "termCount",
            btnStateKey: "timeUnit",
            btnPosition: "right",
            isDynamicButtonText: true,
            isButtonCheckedByText: true,
        },
        rate: {
            attr: GenerateFieldConfig(
                "rate",
                config.minRate,
                config.maxRate,
                config.placeholderRate,
                0.01
            ),
            headerTextKey: "interestRate",
            containerAriaKey: "rate",
            array: rateArray,
            inpStateKey: "interestRate",
            btnStateKey: "interestRateInterval",
            btnPosition: "right",
        },
    };


    return (
        <div
            id="user-input-block"
            key="user-input-block-key"
            style={{
                minWidth: GetBlockMinValues()[0],
            }}
            aria-label={GetValidTextValue([...(Ways?.['uIfAl'] || []), 'userInputBlock'], state.currentLanguage)}
        >
            <GetLangBtnBlock state={state} setState={setState} />
            <form
                className="user-data-input"
                key="form-key"
                aria-label={GetValidTextValue([...(Ways?.['uIfAl'] || []), 'form'], state.currentLanguage)}
            >
                <h2 id="title" className="mUItext" key="form-title-key">
                    {GetValidTextValue(Ways.uIfT, state.currentLanguage)}
                </h2>
                <button
                    id="clear-form"
                    key="clear-form-key"
                    className="sUItext"
                    aria-label={GetValidTextValue([...(Ways?.['uIfAl'] || []), 'clearButton'], state.currentLanguage)}
                >
                    {GetValidTextValue(Ways.uIfCb, state.currentLanguage)}
                </button>
                <div key="user-input-data-block-key">
                    <div id="decimal-input-block" key="decimal-input-block-key">
                        {Object.keys(data).map( key => (
                            <CreateInputAndButton
                                key={key}
                                state={state}
                                setState={setState}
                                data={data[key]}
                            />
                        ))}
                    </div>
                    <div id="type-radio" key="type-radio-key">
                        <h4
                            id="header-radio-title"
                            key="header-radio-title-key"
                            className="sUItext"
                        >
                            {GetValidTextValue([...(Ways?.['uIfUiMt'] || []), 'type'], state.currentLanguage)}
                        </h4>
                        {
                            radioDataButtons.map(data => CreateRadioInput(state, setState, data))
                        }
                    </div>
                    <button
                        id="submit-btn"
                        key="submit-btn-key"
                        type="submit"
                        className="light-bg mUItext"
                        aria-label={GetValidTextValue([...(Ways?.['uIfAl'] || []), 'submit'], state.currentLanguage)}
                        value={defaultValues.submitText}
                    >
                        <img src={CalcIcon} alt="Calculator icon" />
                        {/* <span> */}
                            {GetValidTextValue(Ways.uIfCbT, state.currentLanguage)}
                        {/* </span> */}
                    </button>
                </div>
            </form>
        </div>
    );
}
