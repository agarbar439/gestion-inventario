import { get } from "needle";
import { parse } from "papaparse";

// PapaParse para stream en Node.js
import { NODE_STREAM_INPUT } from "papaparse"; // Asegúrate de tener papaparse >= 5.0.0

const results = [];
const options = {
    header: true,
    delimiter: ";",
};

const csvDatasetUrl = "http://localhost:3000/productos"; // Usa URL completa si estás en Node

get(csvDatasetUrl)
    .pipe(parse(NODE_STREAM_INPUT, options))
    .on("data", (row) => {
        results.push(row);
    })
    .on("end", () => {
        console.log("Datos parseados:", results);
    });
