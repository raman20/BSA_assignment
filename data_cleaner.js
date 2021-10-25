let fs = require("fs");

let rawDataFilePath = "../raw_data.csv";
let finalJsonFilePath = "./final_data.json";

function cleanData(raw_data) {
    raw_data = raw_data.split("\n");
    raw_data = raw_data.map((elem) => elem.split(","));
    raw_data = raw_data.filter((elem) => elem.length === 4);
    raw_data.shift();

    let final_json = {};
    let re = "(ghgs|co2|ch4|n2o|nf3|sf6|hfcs|pfcs|mix)(?=.*emissions)";

    raw_data.forEach((elem) => {
        let [country, year, value, category] = elem;
        if (!final_json.hasOwnProperty(country)) {
            final_json[country] = {};
        }

        if (!final_json[country].hasOwnProperty(year)) {
            final_json[country][year] = {};
        }

        let gas = category.match(re);
        if (gas[0] === "mix") {
            final_json[country][year]["hfcs_pfcs_mix"] = parseFloat(value);
        } else {
            final_json[country][year][gas[0]] = parseFloat(value);
        }
    });

    return final_json;
}

fs.readFile(rawDataFilePath, "utf8", (err, raw_data) => {
    if (err) console.log(err);
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
