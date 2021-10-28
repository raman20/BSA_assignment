import "./style.css";

export default function DataSelector(props) {
    
    // setting maping function for rendering data option for dropdown from dataList prop based on flag prop.
    let mapper;
    if (props.flag === "Country") {
        mapper = (country) => {
            return (
                <option key={country} value={country}>
                    {country}
                </option>
            );
        };
    } else {
        mapper = (param) => {
            let paramName = param.toUpperCase();
            if (param === "hfcs_pfcs_mix") paramName = "Mix of hfcs & Pfcs";
            else if (param === "ghgs") paramName = "All green house gases";
            return (
                <option key={param} value={param}>
                    {paramName}
                </option>
            );
        };
    }

    return (
        <div className="Data_Selector">
            <DataViewer
                dataList={props.dataList}
                removeData={props.removeData}
            />
            <DataDropdown
                addData={props.addData}
                allData={props.allData}
                mapper={mapper}
                flag={props.flag}
            />
        </div>
    );
}

function DataViewer(props) {
    return (
        <div className="Data_Viewer">
            {props.dataList.map((element) => (
                <Data
                    key={element}
                    dataName={element}
                    removeData={props.removeData}
                />
            ))}
        </div>
    );
}

function DataDropdown(props) {
    let addData = (event) => {
        props.addData(event.target.value);
        event.target.value = "";
    };

    return (
        <div className="Data_Dropdown">
            <select onChange={addData}>
                <option value="">Select {props.flag}</option>
                {props.allData.map(props.mapper)}
            </select>
        </div>
    );
}

function Data(props) {
    let removeData = (event) => {
        props.removeData(event.target.innerText.split(" x")[0]);
    };
    return (
        <div style={{ height: "max-content", cursor: "pointer" }}>
            <span className="Data_Item" onClick={removeData}>
                {props.dataName} x
            </span>
        </div>
    );
}
