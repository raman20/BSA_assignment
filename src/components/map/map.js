import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
export default function Map(props) {
    const [mapData, setMapData] = useState();
    const [msg, setMsg] = useState("Please Select Countries and Gases!!!");

    useEffect(() => {
        let mapProps = {
            coordinates: [],
            options: {
                colorAxis: { colors: ["green", "black"] },
                backgroundColor: "#81d4fa",
                datalessRegionColor: "#f5f5f5",
            },
            apiKey: "AIzaSyA67LsS4IalSYFyI4ZnT3Hj0q0MpRIqbfE",
        };

        if (props.countryList.length && props.paramList.length) {
            if (props.paramList.length > 2) {
                setMsg(
                    "Sorry, Google Geo Chart dont Support more than 2 parameters!!!"
                );
                return;
            }

            let labels = ["Country"].concat(...[props.paramList]);
            mapProps.coordinates.push(labels);
            for (let country of props.countryList) {
                let cord = new Array(props.paramList.length + 1).fill(0);
                if (country === "United States of America") cord[0] = "US";
                else if (country === "Russian Federation") cord[0] = "Russia";
                else if (country === "United Kingdom") cord[0] = "GB";
                else cord[0] = country;

                for (
                    let year = props.startYear;
                    year <= props.endYear;
                    year++
                ) {
                    for (let j = 0; j < props.paramList.length; j++) {
                        let emission =
                            props.DATA[country][year][props.paramList[j]];
                        emission = emission !== undefined ? emission : 0;
                        cord[j + 1] += emission;
                    }
                }
                mapProps.coordinates.push(cord);
            }
            console.log(mapProps);
            setMapData(mapProps);
            setMsg("");
        } else {
            setMsg("Please Select Countries and Gases!!!");
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
                    data={mapData.coordinates}
                    options={mapData.options}
                    mapsApiKey={mapData.apiKey}
                />
            )}
        </div>
    );
}

function Msg(props) {
    return <div>{props.msg ? props.msg : "Chart loading...."}</div>;
}
