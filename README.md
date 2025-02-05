# Mortgage repayment calculator

## Description
This app helps you calculate your monthly mortgage payment based on your input data.


## Installation process
1. Clone the ripo:
   ```bash
   git clone https://github.com/ваш-username/weather-app.git

2. Install dependencies:
    bash cmd: npm install

3. Start the project
    bash cmd: npm start

## Usage

1. Loan Amount:
    - Enter the loan amount in the first input field.
    - Use the left section to change the currency symbol. All available values are stored in ./components/lang/lang.json. Click to view all options.

2. Loan Term:
    - Enter the loan term in months or years in the next input field.
    - Switch between months and years by clicking the filled color rectangle.

3. Interest Rate:
    - Enter the interest rate based on bank data. It can be specified as monthly or yearly.
    - The right rectangle indicates the rate type:
        - %y: Percentage per year.
        - %m: Percentage per month.
        - Switch between them by clicking the filled color rectangle.

4. Repayment Type:
    - Select one repayment type:
        - Repayment: Calculates both principal and interest.
        - Interest Only: Calculates only the interest.

5. Clear Data:
    - Click the **Clear** All button to reset all input fields to empty values.

6. Calculate:
    - Click the **Calculate Repayments** button to see the result.
    - On a wide screen, the result appears in the right section. On mobile, it appears at the bottom.
    - If any data is invalid, the corresponding field will be highlighted in red.

7. Configuration:
    - All configuration data (e.g., min/max values) is stored in ./components/config/config.js.

8. Feedback:
    - If you like the app, please leave a review!

## Process Under the Hood
1. Page Load:
    - The app attempts to detect the browser's language:
        - If the language is supported (found in ./components/lang/lang.json), it loads the page with the appropriate language and currency.
        - If not, it defaults to the language specified in ./components/config/defaultValues.js (default: en).

2. Language Selection:
    - After the page loads, language buttons appear at the top of the form.
    - Click any button to change the page language.

3. Input Validation:
    - The range for loan amount, term, and interest rate is defined in the config file.
    - The selected repayment type determines the calculation logic.

4. Calculation:
    - Valid data is passed to the result form and displayed.
    - Invalid data triggers an error message with a description.

5. Clear Functionality:
    - The **Clear** button resets all input fields to empty values.

6. Text errors messages
    - All error messages are stored in './components/config/errorsMsgs.json'

## Technology
    - Frontend: React, CSS

## Contacts
    - GitHub: ваш-username
    - Email: my.email.third@gmail.com

