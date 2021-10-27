import { useEffect, useState } from "react";
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

    useEffect(() => {
        console.log(startYear, endYear);
    }, [startYear, endYear]);

    return (
        <div id="App">
            <div id="Data_Selector_Section">
                <CountrySelector
                    countryList={Array.from(countrySet)}
                    addCountry={addCountry}
                    removeCountry={removeCountry}
                    allCountries={Object.keys(APP_DATA.data)}
                />
                <ParamSelector
                    paramList={Array.from(paramSet)}
                    addParam={addParam}
                    removeParam={removeParam}
                    allParams={APP_DATA.params}
                />
                <TimePeriod
                    setStartYear={setStartYear}
                    setEndYear={setEndYear}
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
