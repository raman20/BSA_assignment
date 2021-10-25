import { useState } from "react";
import Chart from "./components/chart/chart";
import Map from "./components/map/map";
import CountrySelector from "./components/data_input/country_selector";
import ParamSelector from "./components/data_input/param_selector";
import TimePeriod from "./components/data_input/time_period";
let DATA = require("./final_data.json");

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

    /*let chartMapData = {
        DATA: DATA,
        countryList: Array.from(countrySet),
        paramList: Array.from(paramSet),
        startYear: startYear,
        endYear: endYear,
    };

    let countrySelectorProps = {
        countrySet: countrySet,
        removeCountry: removeCountry,
        addCountry: addCountry,
    };

    let paramSelectorProps = {
        paramSet: paramSet,
        removeParam: removeParam,
        addParam: addParam,
    };

    let timePeriodProps = {
        setStartYear: setStartYear,
        setEndYear: setEndYear,
    };*/

    return (
        <div className="App">
            {/*<DataInput
                countrySelectorProps={countrySelectorProps}
                paramSelectorProps={paramSelectorProps}
                timePeriodSelectorProps={timePeriodProps}
            />*/}
            <div>
                <CountrySelector
                    countrySet={countrySet}
                    addCountry={addCountry}
                    removeCountry={removeCountry}
                />
                <ParamSelector
                    paramSet={paramSet}
                    addParam={addParam}
                    removeParam={removeParam}
                />
                <TimePeriod
                    setStartYear={setStartYear}
                    setEndYear={setEndYear}
                />
            </div>
            <Chart
                DATA={DATA}
                countryList={Array.from(countrySet)}
                paramList={Array.from(paramSet)}
                startYear={startYear}
                endYear={endYear}
            />
            <Map
                DATA={DATA}
                countryList={Array.from(countrySet)}
                paramList={Array.from(paramSet)}
                startYear={startYear}
                endYear={endYear}
            />
        </div>
    );
}

export default App;
