import fs from 'node:fs';

const english = JSON.parse(fs.readFileSync(new URL('../messages/en.json', import.meta.url)));
const arabic = JSON.parse(fs.readFileSync(new URL('../messages/ar.json', import.meta.url)));

function flatten(value, prefix = '', output = new Map()) {
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === 'object' && !Array.isArray(child)) flatten(child, path, output);
    else output.set(path, child);
  }
  return output;
}

const en = flatten(english);
const ar = flatten(arabic);
const missing = [...en.keys()].filter((key) => !ar.has(key));
const extra = [...ar.keys()].filter((key) => !en.has(key));
const empty = [...ar.entries()].filter(([, value]) => typeof value !== 'string' || value.trim() === '').map(([key]) => key);

if (missing.length || extra.length || empty.length) {
  console.error(JSON.stringify({ missing, extra, empty }, null, 2));
  process.exit(1);
}

console.log(`Message parity passed: ${en.size} keys`);
