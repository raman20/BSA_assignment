import { useEffect, useState } from "react";
import Chart from "./components/chart/chart";
import Map from "./components/map/map";
import CountrySelector from "./components/data_input/country_selector";
import ParamSelector from "./components/data_input/param_selector";
import TimePeriod from "./components/data_input/time_period";
import "./App.css";
let APP_DATA = require("./final_data.json");

function App() {
    const [countrySet, setCountrySet] = useState(new Set());    // using set to avoid duplicates
    const [paramSet, setParamSet] = useState(new Set());
    const [startYear, setStartYear] = useState("1990");
    const [endYear, setEndYear] = useState("1990");

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

    // effect after mounting
    useEffect(() => {
        // Retrieves state from the URL after mounting, only if available.
        let urlState = getStateFromUrl();
        if (Object.keys(urlState).length > 1) {
            setCountrySet(new Set(JSON.parse(urlState.countryList)));
            setParamSet(new Set(JSON.parse(urlState.paramList)));
            setStartYear(urlState.startYear);
            setEndYear(urlState.endYear);
        }
    }, []);

    // side Effect for reflecting app state to the URL
    useEffect(() => {
        setStateInUrl(
            Array.from(countrySet),
            Array.from(paramSet),
            startYear,
            endYear
        );
    }, [countrySet, paramSet, startYear, endYear]);

    // checking if start year is lesser or not
    // else can't be able to plot data on map & chart
    useEffect(() => {
        if (startYear > endYear) {
            setEndYear(startYear);
        }
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
                    startYear={startYear}
                    endYear={endYear}
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

// extracts and parse the URL encoded query parameters
function getStateFromUrl() {
    let query = window.location.search; //-> "/?param1=value&param2=val..."
    query = query.substr(1);

    let urlState = {};
    query.split("&").forEach(function (part) {
        var item = part.split("=");
        urlState[item[0]] = window.decodeURIComponent(item[1]); // decodes the url encoding of query param
    });
    return urlState;
}

// pushing the state changes to url using history API
function setStateInUrl(countryList, paramList, startYear, endYear) {
    let urlState = `/?`;
    urlState += `countryList=${JSON.stringify(countryList)}`;
    urlState += `&paramList=${JSON.stringify(paramList)}`;
    urlState += `&startYear=${startYear}&endYear=${endYear}`;
    window.history.pushState({}, "", urlState);
}
