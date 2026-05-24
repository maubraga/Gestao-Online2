import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "www");

const copyTargets = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.json",
  "Modelos.xlsx",
  "assets",
];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const target of copyTargets) {
  const sourcePath = path.join(root, target);
  const destinationPath = path.join(outDir, target);
  fs.cpSync(sourcePath, destinationPath, { recursive: true, force: true });
}

console.log(`Build pronto em ${outDir}`);
