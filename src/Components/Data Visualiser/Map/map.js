import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";

export default function Map(props) {
    const [mapData, setMapData] = useState();
    const [msg, setMsg] = useState(
        "Map -> Please Select Countries and Parameters!!!"
    );

    useEffect(() => {
        // Google Charts Map properties
        let mapProps = {
            data: [],
            options: {
                colorAxis: { colors: ["#00853f", "black", "#e31b23"] },
                backgroundColor: "#81d4fa",
                datalessRegionColor: "#f5f5f5",
            },
            apiKey: "AIzaSyA67LsS4IalSYFyI4ZnT3Hj0q0MpRIqbfE",
        };

        if (props.countryList.length > 0 && props.paramList.length > 0) {
            if (props.paramList.length > 2) {
                /*
                    Google Charts Geo Maps Doesn't Allow to specify more than 
                    2 parameters while marking countries.  
                */
                setMsg(
                    "Map -> Sorry, Google Geo Chart dont Support more than 2 parameters!!!"
                );
                return;
            }

            // labels for marking on Geo Map
            let labels = ["Country"].concat(
                ...props.paramList.map((param) => `Total ${param}`)
            );
            mapProps.data.push(labels);

            // Calculating Total Value of Parameters for Selected Countries between Selected time Period
            for (let country of props.countryList) {
                let dataPoint = new Array(1 + props.paramList.length).fill(0);  // ["CountryName", ...Params];

                // Setting Country names according to Google Charts GeoMap compatibility
                if (country === "United States of America") dataPoint[0] = "US";
                else if (country === "Russian Federation") dataPoint[0] = "Russia";
                else if (country === "United Kingdom") dataPoint[0] = "GB";
                else dataPoint[0] = country;

                for (let year = props.startYear; year <= props.endYear; year++) {
                    // aggregating total Emission
                    for (let j = 0; j < props.paramList.length; j++) {
                        let emission = props.DATA[country][year][props.paramList[j]];
                        emission = emission !== undefined ? emission : 0;
                        dataPoint[j + 1] += emission;
                    }
                }
                mapProps.data.push(dataPoint);
            }
            setMapData(mapProps);
            setMsg("");
        } else {
            setMsg("Map -> Please Select Countries and Parameters!!!");
        }
    }, [
        props.countryList,
        props.paramList,
        props.DATA,
        props.startYear,
        props.endYear,
    ]);
    return (
        <div>
            {msg ? (
                <Msg msg={msg} />
            ) : (
                <Chart
                    chartType="GeoChart"
                    loader={<Msg />}
                    data={mapData.data}
                    options={mapData.options}
                    mapsApiKey={mapData.apiKey}
                />
            )}
        </div>
    );
}

function Msg(props) {
    return <div>{props.msg ? props.msg : "Map loading...."}</div>;
}
