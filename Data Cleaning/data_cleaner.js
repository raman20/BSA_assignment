let fs = require("fs");

let rawDataFilePath = "./raw_data.csv";
let finalJsonFilePath = "./final_data.json";

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
    /**/
    raw_data = raw_data.split("\n");
    raw_data = raw_data.map((elem) => elem.split(","));
    raw_data = raw_data.filter((elem) => elem.length === 4);
    raw_data.shift();

    let final_json = {
        data: {},
        gases: new Set(),
        years: new Set(),
    };
    let allGases = new Set();
    let allYears = new Set();

    let regex = "(ghgs|co2|ch4|n2o|nf3|sf6|hfcs|pfcs|mix)(?=.*emissions)";

    raw_data.forEach((elem) => {
        let [country, year, value, category] = elem;
        if (!final_json.data.hasOwnProperty(country)) {
            final_json.data[country] = {};
        }

        if (!final_json.data[country].hasOwnProperty(year)) {
            final_json.data[country][year] = {};
        }

        let gasData = category.match(regex);
        let gas = gasData[0];
        if (gas === "mix") {
            gas = "hfcs_pfcs_mix";
        }
        final_json.data[country][year][gas] = parseFloat(value);
        allGases.add(gas);
        allYears.add(year);
    });
    final_json.gases = Array.from(allGases);
    final_json.years = Array.from(allYears);

    return final_json;
}
