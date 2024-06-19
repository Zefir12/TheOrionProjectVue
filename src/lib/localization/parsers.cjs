const fs = require("fs");

// Path to the locale folder
const localeFolderPath = "src/locales/";
const files = fs.readdirSync(localeFolderPath);
const jsonFiles = files.filter((file) => file.endsWith(".json"));
const jsonDictionary = {};

// Import each JSON file and save it in the dictionary
jsonFiles.forEach((file) => {
    const filePath = `${localeFolderPath}${file}`;
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const fileName = file.split(".")[0]; // Get the name of the file without the extension
    jsonDictionary[fileName] = jsonData;
});

const getNestedValue = (obj, keys) => {
    if (keys.length === 0) {
        return obj;
    } else {
        const key = keys[0];
        if (key in obj) {
            return getNestedValue(obj[key], keys.slice(1));
        } else {
            return null;
        }
    }
};

/**
 * Recursively reproduces a JSON object into a string representation of the JSON.
 * @param {Object} jsonInput - The JSON object to reproduce.
 * @param {string} [prefix=""] - The prefix to prepend to each key in the reproduced JSON.
 * @param {string} [indent="\t"] - The indentation string to use for each level of the reproduced JSON.
 * @return {string} The string representation of the reproduced JSON.
 */
function reproduceJson(jsonInput, prefix = "", indent = "\t") {
    let output = "";
    const keys = Object.keys(jsonInput);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const currentKey = prefix ? `${prefix}.${key}` : key;
        const value = jsonInput[key];

        if (typeof value === "object") {
            output += `${indent}"${key}": {\n`;
            output += reproduceJson(value, key, indent + "\t");
            output += `${indent}}`;
        } else {
            if (value.includes("@:")) {
                const enJson = jsonDictionary["en"];
                const enValue = getNestedValue(enJson, currentKey.split("."));
                output += `${indent}"${key}": "${enValue}"`;
            } else {
                output += `${indent}"${key}": "${value}"`;
            }
        }
        if (i < keys.length - 1) {
            output += ",\n";
        } else {
            output += "\n";
        }
    }
    return output;
}

for (const key in jsonDictionary) {
    if (key !== "en") {
        const jsonData = jsonDictionary[key];
        let output = "{\n";
        output += reproduceJson(jsonData);
        output += "}\n";
        fs.writeFileSync(`${localeFolderPath}${key}.json`, output);
    }
}
