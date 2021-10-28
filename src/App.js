import "./App.css";
import { useEffect, useState } from "react";

import DataSelector from "./Components/Data Input/data_selector";
import TimePeriod from "./Components/Data Input/time_period";
import DataVisualiser from "./Components/Data Visualiser/data_visualiser";

let Clean_Data = require("./clean_data.json");


export default function App() {
    const [countrySet, setCountrySet] = useState(new Set()); // using Set to avoid duplicates
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

    // Retrieves state from the URL after mounting, only if available.
    useEffect(() => {
        let urlState = getStateFromUrl();
        if (Object.keys(urlState).length > 1) {

            // filtering out countries that are not available in Clean Data
            let countryList = JSON.parse(urlState.countryList);
            countryList = countryList.filter((item) => Clean_Data.data.hasOwnProperty(item));
            
            // filtering out parameters that are not available in Clean Data
            let paramList = JSON.parse(urlState.paramList);
            paramList = paramList.filter((item)=> Clean_Data.params.indexOf(item) !== -1);

            setCountrySet(new Set(countryList));
            setParamSet(new Set(paramList));
            setStartYear(urlState.startYear);
            setEndYear(urlState.endYear);
        }
    }, []);

    // reflecting app state changes to the URL
    useEffect(() => {
        setStateInUrl(
            Array.from(countrySet),
            Array.from(paramSet),
            startYear,
            endYear
        );

        // checking if start year is lesser or not
        // else can't be able to plot data on map & chart
        if (startYear > endYear) {
            setEndYear(startYear);
        }
    }, [countrySet, paramSet, startYear, endYear]);

    return (
        <div id="App">
            <div id="Data_Selector_Section">
                <DataSelector
                    flag="Country"
                    dataList={Array.from(countrySet)}
                    addData={addCountry}
                    removeData={removeCountry}
                    allData={Object.keys(Clean_Data.data)}
                />
                <DataSelector
                    flag="Parameter"
                    dataList={Array.from(paramSet)}
                    addData={addParam}
                    removeData={removeParam}
                    allData={Clean_Data.params}
                />
                <TimePeriod
                    startYear={startYear}
                    endYear={endYear}
                    setStartYear={setStartYear}
                    setEndYear={setEndYear}
                    allYears={Clean_Data.years}
                />
            </div>
            <DataVisualiser  
                    DATA={Clean_Data.data}
                    countryList={Array.from(countrySet)}
                    paramList={Array.from(paramSet)}
                    startYear={startYear}
                    endYear={endYear}
            />
        </div>
    );
}

// extracts and parse the URL encoded query parameters
function getStateFromUrl() {
    let query = window.location.search; //-> "?param1=value&param2=value&..."
    query = query.substr(1);

    let urlState = {};
    query.split("&").forEach(function (part) {
        var item = part.split("=");
        urlState[item[0]] = window.decodeURIComponent(item[1]); // decodes the url encoding of query param
    });
    return urlState;
}

/**
 * pushing the state changes to url using history API 
 * 
 * @param {string[]} countryList 
 * @param {string[]} paramList 
 * @param {string} startYear 
 * @param {string} endYear 
 */
function setStateInUrl(countryList, paramList, startYear, endYear) {
    let urlState = `/?`;
    urlState += `countryList=${JSON.stringify(countryList)}`;
    urlState += `&paramList=${JSON.stringify(paramList)}`;
    urlState += `&startYear=${startYear}&endYear=${endYear}`;
    
    window.history.pushState({}, "", urlState);
}
