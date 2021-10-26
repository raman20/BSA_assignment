import "./style.css";

export default function CountrySelector(props) {
    return (
        <div className="Data_Selector">
            <CountryViewer
                countrySet={props.countrySet}
                removeCountry={props.removeCountry}
            />
            <CountryDropdown addCountry={props.addCountry} />
        </div>
    );
}

function CountryViewer(props) {
    return (
        <div className="Data_Viewer">
            {Array.from(props.countrySet).map((element) => (
                <Country
                    key={element}
                    countryName={element}
                    removeCountry={props.removeCountry}
                />
            ))}
        </div>
    );
}

function CountryDropdown(props) {
    let addCountry = (event) => {
        props.addCountry(event.target.value);
        event.target.value = "";
    };

    return (
        <div className="Data_Dropdown">
            <form>
                <select onChange={addCountry}>
                    <option value="">Select Country</option>
                    {props.allCountries.forEach((country) => {
                        return (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        );
                    })}
                </select>
            </form>
        </div>
    );
}

function Country(props) {
    let removeCountry = (event) => {
        props.removeCountry(event.target.innerText.split(" x")[0]);
    };
    return (
        <div style={{ height: "max-content" }}>
            <span className="Data_Item" onClick={removeCountry}>
                {props.countryName} x
            </span>
        </div>
    );
}
