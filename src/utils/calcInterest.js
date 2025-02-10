/**
 * 
 * @param { Object } state - Parent object with valid data 
 * 
 * @returns { Number } 
 */

export default function calcInterest ({state}) {
    
    const listOfKeys = ['paymentCount', 'timeUnit', 'termCount', 'interestRateInterval', 'interestRate', 'mortgageType'];

    let isValid = listOfKeys.some(key => [0, "0", "", null].includes(state[key]));

    if ( isValid ) {
        return 0;
    } else {

        let result = 0;

        if ( state.timeUnit === state.interestRateInterval) {
            
        } else {

        }
    }
}