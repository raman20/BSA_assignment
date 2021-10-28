// Data cleaning script

let fs = require("fs");

let rawDataFilePath = "./raw_data.csv";
let finalJsonFilePath = "./clean_data.json";

fs.readFile(rawDataFilePath, "utf8", (err, raw_data) => {
    if (err) {
        console.log(err);
        return;
    }

    let final_json = cleanData(raw_data);

    fs.writeFile(
        finalJsonFilePath,
        JSON.stringify(final_json),
        "utf8",
        (err) => {
            err
                ? console.log(`error -> ${err}`)
                : console.log("file writtern successfully!");
        }
    );
});

function cleanData(raw_data) {
    /*
        This function cleans the raw data into Json.
        
        raw data format -> "Australia,1212.212,carbon_dioxide_co2_emissions\nItaly,12.212,methane_ch4_emissions\n..." 
    */
    raw_data = raw_data.split("\n");                            //output -> ["Australia,1212.212,carbon_dioxide_co2_emissions","Italy,12.212,methane_ch4_emissions",...]
    raw_data = raw_data.map((elem) => elem.split(","));         //output -> [["Australia","1212.212","carbon_dioxide_co2_emissions"],["Italy","12.212","methane_ch4_emissions"]]
    raw_data = raw_data.filter((elem) => elem.length === 4);    //filtered the empty rows
    raw_data.shift();                                           //removed the raw data headers

    let clean_data = {
        data: {},
        params: [],
        years: [],
    };
    let allParams = new Set();   //storing all gases, for rendering dropdowns 
    let allYears = new Set();    //storing all years 

    /*
        regular expression for extracting the parameter symbols from the raw data,
        all the parameters symbols comes before "emissions" keyword and 
        "emissions" keyword is occuring in every row of "category" column of csv data

        so, it looks for the symbols upto the "emissions" keyword only
    */
    let regex = "(ghgs|co2|ch4|n2o|nf3|sf6|hfcs|pfcs|mix)(?=.*emissions)";

    raw_data.forEach((elem) => {
        let [country, year, value, category] = elem;
        if (!clean_data.data.hasOwnProperty(country)) {
            clean_data.data[country] = {};
        }

        if (!clean_data.data[country].hasOwnProperty(year)) {
            clean_data.data[country][year] = {};
        }

        let gasData = category.match(regex);
        let gas = gasData[0];
        if (gas === "mix") {
            gas = "hfcs_pfcs_mix";
        }
        clean_data.data[country][year][gas] = parseFloat(value);
        allParams.add(gas);
        allYears.add(year);
    });

    clean_data.params = Array.from(allParams);
    clean_data.years = Array.from(allYears);
    return clean_data;
}
