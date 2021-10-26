import "./style.css";

export default function TimePeriod(props) {
    return (
        <div className="Time_Period">
            <div className="Start_Year">
                <label>
                    {" "}
                    Start Year{" "}
                    <select
                        defaultValue={1990}
                        onChange={(event) =>
                            props.addStartYear(parseInt(event.target.value))
                        }
                    >
                        {props.allYears.forEach((year) => (
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
                        defaultValue={1990}
                        onChange={(event) =>
                            props.endStartYear(parseInt(event.target.value))
                        }
                    >
                        {props.allYears.forEach((year) => (
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
