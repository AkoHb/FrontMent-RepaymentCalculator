/**
 * This function will fill the valid form for custom React component
 * 
 * @param { String } type - current box name
 * @param { String | Number } min - pass the min value from config file
 * @param { String | Number } max - pass the max value from config file
 * @param { Number } step - pass the step for the input field (default = 1)
 * @param { String } placeholder - pass the placeholder value from config file
 * @param { Function } handleChange - processing the input data and pass it to the state
 * @param { Function } handleClick - processing the button text by the state and input value
 * 
 * 
 * @returns { Object } - return the filled Object
 * */

export default function generateFieldConfig(
    type,
    min,
    max,
    placeholder,
    step = 1
) {
    return {
        header: {
            id: `money-${type}-header`,
            key: `amount-${type}-header-key`,
            classes: "",
        },
        container: {
            id: `money-${type}-cont`,
            key: `money-${type}-cont-key`,
            classes: "",
        },
        input: {
            id: `money-${type}`,
            className: "blue-btn",
            key: `${type}-inp`,
            type: "number",
            min,
            max,
            step,
            placeholder,
        },
        button: {
            id: `money-${type}-btn`,
            key: `money-${type}-btn-key`,
            type: "button",
        },
    };
}
