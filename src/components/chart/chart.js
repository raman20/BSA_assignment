import Chart from "react-google-charts";
import { useEffect, useState } from "react";

export default function LineChart(props) {
    const [chartData, setChartData] = useState();
    const [msg, setMsg] = useState("Chart -> please Select countries and Parameters!!!");

    useEffect(() => {
        if (props.countryList.length && props.paramList.length) {
            setMsg("");
            if (props.countryList.length === 1) {
                setChartData(
                    coordinateGenerator(
                        props.countryList,
                        props.paramList,
                        props.DATA,
                        props.startYear,
                        props.endYear,
                        "country"
                    )
                );
            } else if (
                props.countryList.length > 1 &&
                props.paramList.length === 1
            ) {
                setChartData(
                    coordinateGenerator(
                        props.paramList,
                        props.countryList,
                        props.DATA,
                        props.startYear,
                        props.endYear,
                        "gas"
                    )
                );
            } else {
                setMsg(
                    "Chart -> only select single Parameter for multiple countries!!!"
                );
            }
        } else {
            setMsg("Chart -> Please Select Countries and Parameters!!!");
        }
    }, [
        props.DATA,
        props.countryList,
        props.paramList,
        props.startYear,
        props.endYear,
    ]);
    return (
        <div>
            {msg ? (
                <Msg msg={msg} />
            ) : (
                <Chart
                    chartType="LineChart"
                    loader={<Msg />}
                    data={chartData.coordinates}
                    options={chartData.options}
                />
            )}
        </div>
    );
}

function Msg(props) {
    return <div>{props.msg ? props.msg : "Chart loading...."}</div>;
}

function coordinateGenerator(
    singlParam,
    multiParam,
    DATA,
    startYear,
    endYear,
    flag
) {
    let chartProps = {
        coordinates: [],
        options: {
            hAxis: {
                title: "Time Period",
            },
            vAxis: {
                title: "Gas Emission Value",
            },
        },
    };

    let param = singlParam[0];
    let chartLabels = ["x"].concat(multiParam);
    chartProps.coordinates.push(chartLabels);

    for (let year = parseInt(startYear); year <= parseInt(endYear); year++) {
        let cord = [year];
        for (let i of multiParam) {
            let emission;
            if (flag === "gas") emission = DATA[i][year][param];
            else emission = DATA[param][year][i];
            emission = emission !== undefined ? emission : 0;
            cord.push(emission);
        }
        chartProps.coordinates.push(cord);
    }
    return chartProps;
}
