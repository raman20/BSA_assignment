import "./style.css";

export default function ParamSelector(props) {
    return (
        <div className="Data_Selector">
            <ParamViewer
                paramSet={props.paramSet}
                removeParam={props.removeParam}
            />
            <ParamDropdown addParam={props.addParam} />
        </div>
    );
}

function ParamViewer(props) {
    return (
        <div className="Data_Viewer">
            {Array.from(props.paramSet).map((element) => (
                <Param
                    key={element}
                    paramName={element}
                    removeParam={props.removeParam}
                />
            ))}
        </div>
    );
}

function ParamDropdown(props) {
    let addParam = (event) => {
        props.addParam(event.target.value);
        event.target.value = "";
    };

    return (
        <div className="Data_Dropdown">
            <form>
                <select onChange={addParam}>
                    <option value="">Select Params</option>
                    {props.allParam.forEach((param) => {
                        let paramName = param.toUpperCase();
                        if (param === "hfcs_pfcs_mix")
                            paramName = "Mix of hfcs & Pfcs";
                        else if (param === "ghgs")
                            paramName = "All green house gases";
                        return (
                            <option key={param} value={param}>
                                {paramName}
                            </option>
                        );
                    })}
                </select>
            </form>
        </div>
    );
}

function Param(props) {
    let removeParam = (event) => {
        props.removeParam(event.target.innerText.split(" x")[0]);
    };
    return (
        <div style={{ height: "max-content" }}>
            <span className="Data_Item" onClick={removeParam}>
                {props.paramName} x
            </span>
        </div>
    );
}
