// add configuration settings
import config from './config/config';
import defaultValues from './config/defaultValues';
import UserInputField from './components/UserInput/userInputField';
import ResultField from './components/Result/resultField';
import './App.scss';

// add the languages library
const langLib = require('./config/lang.json');

export default function App() {

  // const get most usage language from browser
  const browserLang = langLib.hasOwnProperty(navigator.languages[0].split("-")[0]) 
    ? navigator.languages[0].split("-")[0]
    : defaultValues.preloadLanguage;

  console.debug(`User used '${browserLang}' language into browser.`);

  const blockWidth = ( !config.minBlockWidth || config.minBlockWidth < defaultValues.minColumnSize) 
    ? config.minBlockWidth
    : defaultValues.minColumnSize;

  return (
      <div 
        id='container'
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(2, minmax(${blockWidth}px, 50vw))`
        }}
      >
        <UserInputField lang={browserLang}/>
        <ResultField currentLanguage="en" monthlyRep="15156" totalSum="3507878.07" currencyChar="$"/>
      </div>
  );
}
