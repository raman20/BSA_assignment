import "./style.css";

export default function TimePeriod(props) {
    function setStartYear(event) {
        props.setStartYear(event.target.value);
    }

    function setEndYear(event) {
        props.setEndYear(event.target.value);
    }

    return (
        <div className="Time_Period">
            <div className="Start_Year">
                <label>
                    {" "}
                    Start Year{" "}
                    <select
                        id="startYear"
                        value={props.startYear}
                        onChange={setStartYear}
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
                        id="endYear"
                        value={props.endYear}
                        onChange={setEndYear}
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
