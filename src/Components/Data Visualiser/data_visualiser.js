import "../../App.css";
import Chart from "./Chart/chart";
import Map from "./Map/map";


export default function DataVisualiser(props) {
    let {DATA, countryList, paramList, startYear, endYear} = props
    return (
        <div id="Visualiser">
            <Chart
                DATA={DATA}
                countryList={countryList}
                paramList={paramList}
                startYear={startYear}
                endYear={endYear}
            />
            <Map
                DATA={DATA}
                countryList={countryList}
                paramList={paramList}
                startYear={startYear}
                endYear={endYear}
            />
        </div>
    );
}
