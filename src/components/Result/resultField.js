// load еру default settings to avoid errors
import defaultValues from '../../config/defaultValues';

// import calc icon
import ImgEmpty from '../../assets/images/illustration-empty.svg';

import GetBlockMinValues from '../../utils/getBlockMinValues';
// also add file with error messages
let ErrorMSG = require('../../config/errorsMsgs.json');

// Get valid language from 'json' file and fill the valid fields into form
const languages = require('../../config/lang');

const getFormattedValue = str => {
    let num = parseFloat(str) || defaultValues.totalPayment;
    return new Intl.NumberFormat('en-US', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 2 
    }).format(num);
}

const getContent = (lang, currencyChar, month, total) => {

    console.debug([lang, currencyChar, month, total]);

    if ( ![month, total].every(el => parseFloat(el) > 0) ) {
        return (
            <>
                <img 
                    src={ImgEmpty} 
                    key="result-empty-img"
                    alt="'Image with the bill, some money coins, pen, few dollars and calculator on the table"
                ></img>
                <h4
                    id='result-title'
                    className=''
                    key="result-title-key"
                >{languages[lang]?.result?.titleEmpty || ErrorMSG.languageTitle}
                </h4>
                <p
                    id='result-description'
                    key="result-description-key"
                    className=''
                >
                    {languages[lang]?.result?.descriptionEmpty || ErrorMSG.languageTitle}
                </p>
            </>
        )
    } else {
        return (
            <>
                <h2
                    id='result-title'
                    className=''
                    key="result-title-key"
                >{languages[lang]?.result?.title || ErrorMSG.languageTitle}
                </h2>
                <p
                    id='result-description'
                    key="result-description-key"
                    className=''
                >
                    {languages[lang]?.result?.description || ErrorMSG.languageTitle}
                </p>
                <div
                    id='result-info-block'
                    key="result-info-block-key"
                    className=''
                >
                    <h4
                        id='result-monthly-repayment'
                        key="result-monthly-repayment-key"
                        aria-label={languages[lang]?.result?.ariaLabel?.monthly || ErrorMSG.ariaLabel}
                        className=''
                    >
                        {languages[lang]?.result?.monthlyBillTitle || ErrorMSG.languageTitle}
                    </h4>
                    <p
                        id='result-monthly-repayment-value'
                        key="result-monthly-repayment-value-key"
                        className=''
                    >{currencyChar.slice(0, 1)} {getFormattedValue(month)}</p>
                    <hr />
                    <h4
                        id='result-total-repayment'
                        key="result-total-repayment-key"
                        aria-label={languages[lang]?.result?.ariaLabel?.total || ErrorMSG.ariaLabel}
                        className=''
                    >
                        {languages[lang]?.result?.fullBillTitle || ErrorMSG.languageTitle}
                    </h4>
                    <p
                        id='result-total-repayment-value'
                        key="result-total-repayment-value-key"
                        className=''
                    >{currencyChar.slice(0, 1)} {getFormattedValue(total)}</p>
                </div>
            </>
        )
    }

}


export default function resultField({state}) {
    return (
        <div
            id='result-block'
            key="result-block-key"
            className=''
            style={{
                minWidth: GetBlockMinValues()[0],
                // minHeight: getBlockMinValues()[1],
            }}
        >{getContent( state.currentLanguage, state.currentCurrency, state.monthlyPayment, state.totalPayment)}</div>
    )
}
