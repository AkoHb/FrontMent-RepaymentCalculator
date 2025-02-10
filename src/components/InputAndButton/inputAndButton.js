import React, { useEffect, useState } from "react";
import ErrorMSG from "../../config/errorsMsgs.json";
import Ways from "../../config/ways.json";
import GetValidTextValue from "../../utils/getValidTextValue";
import GetWordForm from "../../utils/getWordForm";
import "./inputAndButton.scss";

/**
 * A component that creates a block with an input field and a button.
 * The button text and value change on each click.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.lang - Language code for text display (default: 'en').
 * @param {string | number} props.buttonPosition - Button position: "left" | "right" or 0 | 1.
 * @param {Array} props.arrayWithObjects - Array of objects for changing the button state.
 *  Each object should contain:
 *  - `text` (string): The button's displayed text.
 *  - `value` (string | number): The button's associated value.
 * @param {Object} props.data - Object containing component structure settings:
 *  - `attr`: Object with props for elements
 *  - `header`: Header settings (e.g., title, id, classes).
 *  - `container`: Attributes for the container wrapping the button and input field.
 *  - `input`: Attributes for the input element.
 *  - `button`: Attributes for the button.
 *  - `array`: Array of objects for dynamic button state changes.
 *  - `headerTextKey`: Lastest key to valid text into Language object
 *  - `containerAriaKey`: Lastest key to valid text into Language object
 *  - `inpStateKey`: State key for the input field.
 *  - `btnStateKey`: State key for the button.
 *  - `btnPosition`: Button position ("left" | "right" | 0 | 1, default: "left").
 *  - `isDynamicButtonText`: Flag for dynamically changing button text.
 *  - `isButtonCheckedByText`: Flag for checking button state by text instead of value.
 *
 * @returns {JSX.Element | null} JSX element with an input field and a button, or `null` if the object array is invalid.
 */
export default function CreateInputAndButton({ key, state, setState, data }) {
    const {
        attr,
        array,
        headerTextKey = "",
        containerAriaKey = "",
        inpStateKey,
        btnStateKey,
        btnPosition = "left",
        isDynamicButtonText = false,
        isButtonCheckedByText = false,
    } = data || {};

    const [blockData, setBlockData] = useState({
        inputValue: "",
        buttonText: "...",
        buttonValue: "...",
        errorInput: false,
        errorMessage: "",
    });

    useEffect(() => {
        let crntBtnData = [];
        if (array && array.length > 1) {
            if (isButtonCheckedByText) {
                crntBtnData = array.filter(
                    (obj) => obj?.text === state[btnStateKey]
                );
            } else {
                crntBtnData = array.filter(
                    (obj) => obj?.value === state[btnStateKey]
                );
            }
        }

        if (crntBtnData && crntBtnData.length >= 1) {
            setBlockData((prev) => ({
                ...prev,
                buttonText: crntBtnData[0].text,
                buttonValue: crntBtnData[0].value,
            }));
        }
    }, [state]);

    useEffect(() => {
        if (isDynamicButtonText) {
            let currentTextValue = GetWordForm(
                blockData.inputValue,
                state[btnStateKey],
                state.currentLanguage
            );

            if (currentTextValue && currentTextValue.length >= 1) {
                setBlockData((prev) => ({
                    ...prev,
                    buttonText: currentTextValue,
                }));
            }
        }

        const timer = setTimeout(() => {
            setState((prev) => ({
                ...prev,
                [inpStateKey]: blockData.inputValue,
            }));
        }, 700);

        return () => clearTimeout(timer);
    }, [blockData.inputValue]);

    if (!array || array.length < 1) {
        console.debug(
            ErrorMSG.invalidLength.replace(
                "{val}",
                attr?.container?.id || "No array name"
            )
        );
        return null;
    }

    const getObjectIndex = (key, isSearchByText = false) => {
        if (!array || !array.length) return null;

        let result;

        if (isSearchByText) {
            result = array.findIndex((obj) => obj?.text === state[btnStateKey]);
        } else {
            result = array.findIndex(
                (obj) => obj?.value === state[btnStateKey]
            );
        }
        return result;
    };

    const inputAttr = {
        type: attr?.input?.type || "text",
        min: attr?.input?.min ?? null,
        max: attr?.input?.max ?? null,
        step: attr?.input?.step ?? null,
        placeholder: attr?.input?.placeholder || "Enter value...",
        ...attr?.input,
    };

    const validateInput = (value) => {
        let error = "";
        let errorInput = false;

        if (!value.trim()) {
            error = ErrorMSG.emptyInput;
            errorInput = true;
        } else if (inputAttr.type === "number" && isNaN(value)) {
            error = ErrorMSG.invalidNumber;
            errorInput = true;
        } else if (
            inputAttr.type === "number" &&
            inputAttr.min !== null &&
            value < inputAttr.min
        ) {
            error = ErrorMSG.valueLow.replace("{val}", inputAttr.min);
            errorInput = true;
        } else if (
            inputAttr.type === "number" &&
            inputAttr.max !== null &&
            value > inputAttr.max
        ) {
            error = ErrorMSG.valueGr.replace("{val}", inputAttr.max);
            errorInput = true;
        }

        setBlockData((prevState) => ({
            ...prevState,
            inputValue: value,
            errorInput,
            errorMessage: error,
        }));

        return errorInput;
    };

    const ButtonD = React.memo(() => (
        <button
            {...attr.button}
            onClick={handleButtonClick}
            value={blockData.buttonValue}
            className={blockData.errorInput ? "error-btn" : ""}
        >
            {blockData.buttonText}
        </button>
    ));

    const InputD = React.memo(() => (
        <input
            {...inputAttr}
            value={blockData.inputValue}
            onChange={handleChangeInput}
            className={blockData.errorInput ? "error-input" : ""}
        />
    ));

    const getBlock = () => {
        const position = String(btnPosition).toLowerCase();
        return position === "right" || position === "1"
            ? [<InputD />, <ButtonD />]
            : [<ButtonD />, <InputD />];
    };

    const handleButtonClick = (e) => {
        let cV = e?.target?.value || "";

        let m = getObjectIndex(cV, isButtonCheckedByText);

        if (m !== null) {
            let nI = (m + 1) % array.length;

            setState((prev) => ({
                ...prev,
                [btnStateKey]: isButtonCheckedByText
                    ? array[nI].text
                    : array[nI].value,
            }));

            setBlockData((prev) => ({
                ...prev,
                buttonText: array[nI].text,
                buttonValue: array[nI].value,
            }));

            console.debug(
                `[INFO]: The 'state.${
                    btnStateKey || ""
                }' button value successfully switched from '${
                    blockData.buttonValue
                }' to '${array[nI].value}'`
            );
        }
    };

    const handleChangeInput = (e) => {
        let cV = e?.target?.value || "0";
        if (validateInput(cV)) {
            setBlockData((prev) => ({
                ...prev,
                inputValue: cV,
            }));
        }
    };

    return (
        <div>
            <h4
                id={attr?.header?.id || ErrorMSG.invalidName}
                key={attr?.header?.key || crypto.randomUUID()}
                className={attr?.header?.classes || ""}
            >
                {GetValidTextValue(
                    [...(Ways.uIfUi || []), headerTextKey],
                    state.currentLanguage
                )}
            </h4>
            <div
                id={attr?.container?.id || ErrorMSG.invalidName}
                key={attr?.container?.key || crypto.randomUUID()}
                className={`container ${
                    state.errorInput ? "error-container" : ""
                }`}
                ariaLabel={GetValidTextValue(
                    [...(Ways?.uIfAl || []), containerAriaKey],
                    state.currentLanguage
                )}
            >
                {getBlock()}
            </div>
            {blockData.errorMessage && (
                <p className="error-msg">{blockData.errorMessage}</p>
            )}
        </div>
    );
}
