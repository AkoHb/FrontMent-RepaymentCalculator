// add configuration settings
import config from "./config/config";
import defaultValues from "./config/defaultValues";
import UserInputField from "./components/UserInput/userInputField";
import ResultField from "./components/Result/resultField";
import "./App.scss";
import React, { useEffect } from "react";
import GetRateData from "./utils/getRateData";

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
    paymentCount: 0,
    timeUnit: "year", // 'day' or 'month', 'year'
    interestRateInterval: "month", // 'day' or 'month', 'year'
    termCount: 0,
    interestRate: 0,
    isError: false,
    rateBtnsData: GetRateData(defaultValues.preloadLanguage),
  });

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

  const blockWidth =
    !config.minBlockWidth || config.minBlockWidth < defaultValues.minColumnSize
      ? config.minBlockWidth
      : defaultValues.minColumnSize;

  return (
    <div
      id="container"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(2, minmax(${blockWidth}px, 50vw))`,
      }}
    >
      <UserInputField {...{state, setState}}/>
      <ResultField {...{state}} />
    </div>
  );
}
