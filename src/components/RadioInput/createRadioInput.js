// load the default settings to avoid errors
import Ways from "../../config/ways.json";
import getValidTextValue from "../../utils/getValidTextValue";

/**
 *  The function used to unify the radio inputs
 *
 * @param { Object } state - Parent object with valid tags attributes
 * @param { Object } setState - Paren object with valid tags attributes
 * @param { Object } data - object with valid tags attributes
 * @returns { JSX } - return the JSX Object
 */
export default function createRadioInput(
    state,
    setState,
    data,
) {
    const inputId = data?.input?.id || "invalid-id";
    const labelClasses = data?.label?.classes || "";
    const inputClasses = data?.input?.classes || "";

    const handleChangeRadio = e => {
        setState(prev => ({...prev, mortgageType: e?.target?.value || null}))
    }

    return (
        <label htmlFor={inputId} className={`mUItext ${labelClasses}`}>
            <input
                id={`radio-${inputId}`}
                className={`light-bg ${inputClasses}`}
                key={`radio-${inputId}-key`}
                type="radio"
                onChange={handleChangeRadio}
                value={data?.key || inputId}
                checked={data?.key === state.mortgageType}
                required
            />
            {getValidTextValue([...(Ways?.uIfUiMt  || []), (data?.label?.key || "")], state.currentLanguage)}
        </label>
    );
}
