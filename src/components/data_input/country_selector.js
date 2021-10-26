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
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Canada">Canada</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Estonia">Estonia</option>
                    <option value="European Union">European Union</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Greece">Greece</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Italy">Italy</option>
                    <option value="Japan">Japan</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Malta">Malta</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Norway">Norway</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">
                        Russian Federation
                    </option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Spain">Spain</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States of America">
                        United States of America
                    </option>
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
        <div style={{"height":'max-content'}}>
            <span className="Data_Item" onClick={removeCountry}>
                {props.countryName} x
            </span>
        </div>
    );
}
