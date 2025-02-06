import React, { useState } from 'react';
import languages from '../../config/lang.json';
import ErrorMSG from '../../config/errorsMsgs.json';

/**
 * This component creates a div block with an input field and a button. 
 * The button text and its value will toggle between states on each click.
 * 
 * @param {string} lang - The language code used to display text information (defaults to 'en').
 * @param {string|number} buttonPosition - Defines the position of the button. Valid states are ["left", "right"] or [0, 1].
 * @param {Array} arrayWithObjects - Array of objects used to change the button text and value states. 
 *  Each object should contain the following keys:
 *  - `text` (string): The text displayed on the button.
 *  - `value` (string | number): The associated value for the button.
 * @param {Object} data - Object containing the structure and attributes for the component:
 *  - `header`: Contains details for the header element (e.g., title, id, classes).
 *  - `container`: Contains details for the div that wraps the button and input elements.
 *  - `input`: Attributes for the input element.
 *  - `button`: Attributes for the button element.
 * 
 * @returns {JSX.Element} - A JSX element representing the HTML structure with the dynamic button.
 */
export default function CreateInputAndButton({ lang, data, arrayWithObjects, buttonPosition = "0" }) {
    
    const [state, setState] = useState({
        button: {
            text: arrayWithObjects[0]?.text || '...',
            value: arrayWithObjects[0]?.value || '...'
        },
        errorInput: false,
        inputValue: "",
        errorMessage: ""
    });

    if (!arrayWithObjects || arrayWithObjects.length < 1) {
        console.debug(ErrorMSG.invalidLength.replace('{val}', (data.header?.title || "No array name")));
        return null;
    }

    const inputAttr = {
        type: data.input?.type || 'text',
        min: data.input?.min ?? null,
        max: data.input?.max ?? null,
        step: data.input?.step ?? null,
        placeholder: data.input?.placeholder || 'Enter value...',
        ...data.input
    };

    const validateInput = (value) => {
        let error = "";
        let errorInput = false;

        if (!value.trim()) {
            error = ErrorMSG.emptyInput;
            errorInput = true;
        } else if (inputAttr.type === 'number' && isNaN(value)) {
            error = ErrorMSG.invalidNumber;
            errorInput = true;
        } else if (inputAttr.type === 'number' && inputAttr.min !== null && value < inputAttr.min) {
            error = ErrorMSG.valueLow.replace('{val}', inputAttr.min);
            errorInput = true;
        } else if (inputAttr.type === 'number' && inputAttr.max !== null && value > inputAttr.max) {
            error = ErrorMSG.valueGr.replace('{val}', inputAttr.max);
            errorInput = true;
        }

        setState(prevState => ({
            ...prevState,
            inputValue: value,
            errorInput,
            errorMessage: error
        }));
    };

    const changeTextValue = () => {
        const currentValueIndex = arrayWithObjects.findIndex(item => item.value === state.button.value);
        const newIndex = (currentValueIndex + 1) % arrayWithObjects.length;
        const newValue = arrayWithObjects[newIndex];

        setState(prevState => ({
            ...prevState,
            button: {
                text: newValue.text,
                value: newValue.value
            }
        }));

        console.debug(`[INFO]: The ${data.header?.title || ""} button value successfully switched from '${state.button.value}' to '${newValue.value}'`);
    };

    const ButtonD = () => (
        <button
            {...data.button}
            onClick={changeTextValue}
            value={state.button.value}
            className={state.errorInput ? 'error-btn' : ''}
        >
            {state.button.text}
        </button>
    );

    const InputD = () => (
        <input
            {...inputAttr} 
            value={state.inputValue}
            onChange={(e) => validateInput(e.target.value)}
            className={state.errorInput ? 'error-input' : ''}
        />
    );

    const getBlock = () => {
        const position = String(buttonPosition).toLowerCase();
        return position === 'right' || position === '1'
            ? [<InputD />, <ButtonD />]
            : [<ButtonD />, <InputD />];
    };

    return (
        <>
            <h4 
                id={data?.header?.id || ErrorMSG.invalidName}
                key={data?.header?.key || crypto.randomUUID()}
                className={data.header?.classes || ""}
            >
                {languages[lang]?.userInputForm.userInput[data.header.title] || ErrorMSG.invalidName}
            </h4>
            <div 
                id={data?.container?.id || ErrorMSG.invalidName}
                key={data?.container?.key || crypto.randomUUID()}
                className={`container ${state.errorInput ? 'error-container' : ''}`} 
            >
                {getBlock()}
            </div>
            {state.errorMessage && <p className="error-msg">{state.errorMessage}</p>}
        </>
    );
}
