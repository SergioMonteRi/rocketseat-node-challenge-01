import { parse } from "csv-parse";
import fs from "fs";

export async function processCSV(filePath) {
  const parser = fs
    .createReadStream(filePath)
    .pipe(parse({ columns: true, skip_empty_lines: true }));

  for await (const record of parser) {
    try {
      await fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
    } catch (error) {
      console.error(error);
    }
  }
}

const csvPath = new URL("../../tasks.csv", import.meta.url);
processCSV(new URL(csvPath, import.meta.url));
