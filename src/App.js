import { useState } from "react";
import Chart from "./components/chart/chart";
import Map from "./components/map/map";
import CountrySelector from "./components/data_input/country_selector";
import ParamSelector from "./components/data_input/param_selector";
import TimePeriod from "./components/data_input/time_period";
import "./App.css";
let APP_DATA = require("./final_data.json");

function App() {
    const [countrySet, setCountrySet] = useState(new Set());
    const [paramSet, setParamSet] = useState(new Set());
    const [startYear, setStartYear] = useState(1990);
    const [endYear, setEndYear] = useState(1990);

    function addCountry(countryName) {
        setCountrySet(
            (prevCountrySet) => new Set(prevCountrySet.add(countryName))
        );
    }

    function removeCountry(countryName) {
        setCountrySet(
            (prevCountrySet) =>
                new Set(
                    [...prevCountrySet].filter((elem) => elem !== countryName)
                )
        );
    }

    function addParam(param) {
        setParamSet((prevParamSet) => new Set(prevParamSet.add(param)));
    }

    function removeParam(param) {
        setParamSet(
            (prevParamSet) =>
                new Set([...prevParamSet].filter((elem) => elem !== param))
        );
    }

    function addStartYear(year) {
        if (endYear < year) 
            alert("End Year can't be lesser than start year!!!");
        else setStartYear(year);
    }

    function addEndYear(year) {
        if (startYear > year) 
            alert("Start Year can't be ahead of End year!!!");
        else setEndYear(year);
    }

    return (
        <div id="App">
            <div id="Data_Selector_Section">
                <CountrySelector
                    countrySet={countrySet}
                    addCountry={addCountry}
                    removeCountry={removeCountry}
                    allCountries={Object.keys(APP_DATA.data)}
                />
                <ParamSelector
                    paramSet={paramSet}
                    addParam={addParam}
                    removeParam={removeParam}
                    allParam={APP_DATA.gases}
                />
                <TimePeriod
                    addStartYear={addStartYear}
                    addEndYear={addEndYear}
                    allYears={APP_DATA.years}
                />
            </div>
            <div id="Visualiser">
                <Chart
                    DATA={APP_DATA.data}
                    countryList={Array.from(countrySet)}
                    paramList={Array.from(paramSet)}
                    startYear={startYear}
                    endYear={endYear}
                />
                <Map
                    DATA={APP_DATA.data}
                    countryList={Array.from(countrySet)}
                    paramList={Array.from(paramSet)}
                    startYear={startYear}
                    endYear={endYear}
                />
            </div>
        </div>
    );
}

export default App;
