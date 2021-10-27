import "./style.css";
import { useRef } from "react";

export default function TimePeriod(props) {
    let startYearRef = useRef(null);
    let endYearRef = useRef(null);

    function setStartYear(event) {
        let inputYear = event.target.value;
        if (endYearRef.current.value < inputYear) {
            endYearRef.current.value = inputYear;
        }
        props.setStartYear(event.target.value);
    }

    function setEndYear(event) {
        let inputYear = event.target.value;
        if (startYearRef.current.value > inputYear) {
            endYearRef.current.value = startYearRef.current.value;
        }
        props.setEndYear(event.target.value);
    }

    return (
        <div className="Time_Period">
            <div className="Start_Year">
                <label>
                    {" "}
                    Start Year{" "}
                    <select
                        defaultValue="1990"
                        onChange={setStartYear}
                        ref={startYearRef}
                    >
                        {props.allYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="End_Year">
                <label>
                    {" "}
                    End Year{" "}
                    <select
                        defaultValue="1990"
                        onChange={setEndYear}
                        ref={endYearRef}
                    >
                        {props.allYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
}
