// load еру default settings to avoid errors
import defaultValues from '../../config/defaultValues';

// also load current configuration file and get the values from it
import config from '../../config//config';

// import language buttons block
import GetLangBtnBlock from '../../utils/getLangBtnBlock';

// import func to get valid currencies
import GetCurrencyChars from '../../utils/getCurrencyChars';

// import calc icon
import CalcIcon from '../../assets/images/icon-calculator.svg';

// also add file with error messages
let ErrorMSG = require('../../config/errorsMsgs.json');


// Get valid language from 'json' file and fill the valid fields into form
const languages = require('../../config/lang.json');

const handleChangeLanguage = (e) => {
    console.log(e.target.value);
};

const handleClickTerm = () => {};

const handleClickRate = () => {};

const getRate = arr => arr[0] === '%' && ["m", 'y'].includes(arr[1]) 
    ? (<span>{arr[0]}<sub>{arr[1]}</sub></span>)
    : (<span>%</span>)


export default function UserInputField ({lang}) {
    // console.log([getLanguages(), defaultValues.langButtonsCount]);
    // console.debug(GetCurrencyChars());

    return (
        <div 
            id='user-input-block'
            key='user-input-block-key'
            // style={{
            //     // minWidth: config.minBlockWidth,
            //     // minHeight: config.minBlockHeight,
            //     gridTemplateColumns: `repeat(2, minmax(${config.minBlockWidth}px, 50vw))`
            // }}
            aria-label={languages[lang]?.userInputForm.ariaLabels.userInputBlock || ErrorMSG.ariaLabel}
            >
            <GetLangBtnBlock onClick={handleChangeLanguage}/>
            <form
                className='user-data-input'
                aria-label={languages[lang]?.userInputForm.ariaLabels.form || ErrorMSG.ariaLabel}
            >
                <h3 
                    id="title"
                    className='mUItext'
                >
                    { languages[lang]?.userInputForm.title || ErrorMSG.languageTitle }
                </h3>
                <button
                    id='clear-form'
                    className='sUItext'
                    aria-label={languages[lang]?.userInputForm.ariaLabels.clearButton || ErrorMSG.ariaLabel}
                >
                    { languages[lang]?.userInputForm.clearButton || ErrorMSG.invalidName }
                </button>
                <div>
                    <label 
                        htmlFor="money-amount"
                        className='label-name sUItext'
                    >{languages[lang]?.userInputForm.userInput.moneyAmount || ErrorMSG.invalidName}
                    </label>
                    <div>
                        <select
                            name=''
                            id='currency'
                            className='blue-btn'
                            aria-label={languages[lang]?.userInputForm.ariaLabels.currencySelection || ErrorMSG.ariaLabel}
                            >
                                {GetCurrencyChars().map(ch => (
                                    <option
                                        value={`${ch[0]}-char`}
                                        selected={ch[0] === defaultValues.preloadLanguage}
                                    >{ch[1]}</option>
                                ))}

                        </select>
                        <input 
                            id='money-amount'
                            className='blue-btn'
                            key='money-amount-key'
                            type='number'
                            min={config.minAmount}
                            max={config.maxAmount}
                            placeholder={config.placeholderAmount}
                        ></input>
                    </div>
                    <div id='grid-term-rate'>
                        <div>
                            <label 
                                htmlFor="money-term"
                                className='label-name sUItext'
                            >{languages[lang]?.userInputForm.userInput.term || ErrorMSG.invalidName}
                            </label>
                            <input 
                                id='money-term'
                                className='blue-btn'
                                key='term-inp'
                                type='number'
                                min={config.minTerm}
                                max={config.maxTerm}
                                placeholder={config.placeholderTerm}
                            ></input>
                            <button
                                id='term-msr'
                                className='blue-btn sUItext'
                                key='term-btn'
                                aria-label={languages[lang]?.userInputForm.ariaLabels.term || ErrorMSG.ariaLabel}
                                onClick={handleClickTerm}
                                value={defaultValues.termButton}
                            >
                            {defaultValues.termButton}   
                            </button>
                        </div>
                        <div>
                            <label 
                                htmlFor="money-rate"
                                className='label-name sUItext'
                            >{languages[lang]?.userInputForm.userInput.interestRate || ErrorMSG.invalidName}
                            </label>
                            <input 
                                id='money-rate'
                                className='blue-btn'
                                key='rate-inp'
                                type='number'
                                min={config.minRate}
                                max={config.maxRate}
                                placeholder={config.placeholderRate}
                            ></input>
                            <button
                                id='rate-msr'
                                className='blue-btn sUItext'
                                key='rate-btn'
                                aria-label={languages[lang]?.userInputForm.ariaLabels.rate || ErrorMSG.ariaLabel}
                                onClick={handleClickRate}
                                value={getRate(defaultValues.rate)}
                            >
                            {getRate(defaultValues.rate)}   
                            </button>
                        </div>
                    </div>
                    <div
                        id='type-radio'
                        key='type-radio-key'
                    >
                        <label 
                            htmlFor="type-money"
                            className='label-name sUItext'
                        >
                            {languages[lang]?.userInputForm.userInput.mortgageType.type || ErrorMSG.invalidName}
                        </label>
                        <label 
                            htmlFor="type-rep"
                            className='label-name mUItext'
                        >
                        <input 
                            id='type-rep'
                            className='light-bg'
                            key='type-rep-key'
                            type='radio'
                            checked={defaultValues.type === 'type-rep'}
                        ></input>
                            {languages[lang]?.userInputForm.userInput.mortgageType.repaiment || ErrorMSG.invalidName}
                        </label>
                        <label 
                            htmlFor="type-int"
                            className='label-name mUItext'
                        >
                        <input 
                            id='type-rep'
                            className='light-bg'
                            key='type-int-key'
                            type='radio'
                            checked={defaultValues.type === 'type-int'}
                        ></input>
                            {languages[lang]?.userInputForm.userInput.mortgageType.interestOnly || ErrorMSG.invalidName}
                        </label>
                    </div>
                    <button
                        id='submit-btn'
                        type='submit'
                        className='light-bg mUItext'
                        aria-label={languages[lang]?.userInputForm.ariaLabels.submit || ErrorMSG.ariaLabel}
                        value={defaultValues.submitText}>
                                <img src={CalcIcon} alt='Calculator icon' />
                                <span>{languages[lang]?.userInputForm.calculateButtonText || ErrorMSG.invalidName}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}