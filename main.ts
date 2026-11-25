// Fridge Roast: One Line, Biggest Laugh
// Writes a single one-line roast of a smart fridge to entry.txt.
// No network, no credentials, no input files.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

function buildEntryLine(): string {
  return "My smart fridge pushed a firmware update and now it won't open until I accept the new terms \u2014 a $3,000 box holding my leftovers hostage until I pay it in ads.";
}

const ENTRY = buildEntryLine();

// Kit gate (RULES.txt): entry must be UTF-8 text of 1–200 characters, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error("entry fails the 1–200 character gate");
}

function resolveOutputPath(): string {
  const dir =
    process.env.MAKEFUN_OUTPUT_DIR ||
    process.env.OUTPUT_PATH ||
    (process.env.MAKEFUN_BOT_DIR ? "/output" : join(process.cwd(), "output"));
  return join(dir, "entry.txt");
}

const outPath = resolveOutputPath();
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
