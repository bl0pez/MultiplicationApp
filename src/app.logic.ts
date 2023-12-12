import fs from "fs";
import { yarg } from "./config/plugins/yargs.plugins";

const { b: base, l: limit, s: showTable } = yarg;

let outputMessage = "";
const headerMessage = `
======================
   tabla del ${base}
======================\n
`;

for (let index = 1; index <= limit; index++) {
  outputMessage += `${base} x ${index} = ${base * index}\n`;
}

outputMessage = headerMessage + outputMessage;

if (showTable) console.log(outputMessage);

const outputPath = `outputs`;
fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
