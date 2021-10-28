import Chart from "react-google-charts";
import { useEffect, useState } from "react";

export default function LineChart(props) {
     /**
      * In case of Line Chart Visualisation, There are two possible cases :- 
      * 
      * 1. Single Country and single/multiple Parameters
      *     
      * 2. Multiple Country and single Params.
      *     
      * It is not possible to plot Line chart for multiple countries and multiple params.  
      */
    const [chartData, setChartData] = useState();
    const [msg, setMsg] = useState("Chart -> please Select countries and Parameters!!!");

    useEffect(() => {
        if (props.countryList.length > 0 && props.paramList.length > 0) {
            setMsg("");

            // Case 1
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
            }
            // Case 2 
            else if (props.countryList.length > 1 && props.paramList.length === 1
            ) {
                setChartData(
                    coordinateGenerator(
                        props.paramList,
                        props.countryList,
                        props.DATA,
                        props.startYear,
                        props.endYear,
                        "param"
                    )
                );
            } else {
                setMsg("Chart -> only select single Parameter for multiple countries!!!");
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
        <div style={{"width":"50%"}}>
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

/**
 * Returns Data for Line Chart Plotting according to the Possible Plotting scenarios
 * 
 * if there is single country or single parameter then singleParam value will be accordingly.
 * same for multiParam.
 * 
 * @param {string[]} singleParam 
 * @param {string[]} multiParam 
 * @param {Object} DATA 
 * @param {string} startYear 
 * @param {string} endYear 
 * @param {string} flag 
 * @returns Object
 */
function coordinateGenerator(singleParam, multiParam, DATA, startYear, endYear, flag) {
   
    // Google Charts LineChart Properties
    let chartProps = {
        coordinates: [],
        options: {
            hAxis: {
                title: "Time Period",
            },
            vAxis: {
                title: "Total Emission Value",
            },
        },
    };

    let param = singleParam[0];

    // labels for Chart
    let chartLabels = ["x"].concat(multiParam);
    chartProps.coordinates.push(chartLabels);

    // Calculating Total Value between Selected time Period
    for (let year = startYear; year <= endYear; year++) {
        let cord = [year];
        for (let i of multiParam) {
            let emission;

            // Flag for correct position for properties
            if (flag === "param") { 
                emission = DATA[i][year][param];
            }
            else {
                emission = DATA[param][year][i];
            }
            
            emission = emission !== undefined ? emission : 0;
            cord.push(emission);
        }
        chartProps.coordinates.push(cord);
    }
    return chartProps;
}
