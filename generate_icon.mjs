import fs from "fs";
import path from "path";
import url from "url";

// Equivalent of __dirname in ESM
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const iconsDir = path.join(__dirname, "assets/icons");
const outFile = path.join(__dirname, "constants/icons.ts");

const files = fs.readdirSync(iconsDir);

let imports = "";
let typeDef = "export const icons = {\n";

files.forEach(file => {
  if (!file.endsWith(".png")) return;

  const name = file.replace(".png", "");

  imports += `import ${name} from "@/assets/icons/${file}";\n`;
  typeDef += `  ${name},\n`;
});

typeDef += "} as const;\n";

const output = imports + "\n" + typeDef;

fs.writeFileSync(outFile, output);

console.log(`✔ Filename ${outFile} generated`);
