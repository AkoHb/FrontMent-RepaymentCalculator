// add configuration settings
import React, { useEffect } from "react";
import defaultValues from "./config/defaultValues";
import GetRateData from "./utils/getRateData";
import GetBlockMinValues from "./utils/getBlockMinValues";
import ResultField from "./components/Result/resultField";
import UserInputField from "./components/UserInput/userInputField";
import "./App.scss";

// add the languages library
const langLib = require("./config/lang.json");

const defaultCurrency =
  defaultValues.currency[0] && defaultValues.currency[1]
    ? (0).toLocaleString(defaultValues.currency[0], {
        style: "currency",
        currency: defaultValues.currency[1],
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    : "$";

export default function App() {

  const [state, setState] = React.useState({
    currentLanguage: defaultValues.preloadLanguage,
    currentCurrency: defaultCurrency,
    paymentCount: 350000,
    timeUnit: "year", // 'day','month' or 'year'
    termCount: 1,
    interestRateInterval: "month", // 'day', 'month' or 'year'
    interestRate: 5.25,
    isError: false,
    monthlyPayment: 1461554,
    totalPayment: 11565156
  });

  // console.debug(state);

  useEffect(() => {
    const browserLang = langLib.hasOwnProperty(
      navigator.languages[0].split("-")[0]
    )
      ? navigator.languages[0].split("-")[0]
      : defaultValues.preloadLanguage;

    console.debug(`User used '${browserLang}' language into browser.`);

    setState((prev) =>
      prev.currentLanguage !== browserLang
        ? { ...prev, currentLanguage: browserLang }
        : prev
    );
  }, []);

  // update the language if the user changed it
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      rateBtnsData: GetRateData(prev.currentLanguage),
    }));
  }, [state.currentLanguage]);

  return (
    <div
      id="container"
      style={{
        display: "grid",
        minWidth: GetBlockMinValues()[0],
        gridTemplateColumns: `repeat(2, minmax(${GetBlockMinValues()[0]}px, 1fr))`
        // gridTemplateColumns: `repeat(2, minmax(${GetBlockMinValues()[0]}px, 1fr))`,
      }}
    >
      <UserInputField {...{state, setState}}/>
      <ResultField {...{state}} />
    </div>
  );
}
