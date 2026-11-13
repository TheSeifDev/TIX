import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/components');
const allow = new Set(['TIX', 'Alexandria', 'Agami', 'Contact Us', 'Studio', 'Marketing', 'Production', 'Fashion', 'Luxury', 'UI', 'UX']);
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.tsx')) files.push(full);
  }
}
walk(root);

const findings = [];
for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    const matches = [...line.matchAll(/>([^<{\n]*[a-z][^<{\n]*)</g)].map((match) => match[1].trim()).filter(Boolean);
    for (const text of matches) {
      const words = text.split(/\s+/).filter(Boolean);
      if (words.length >= 4 && ![...allow].some((term) => text === term)) findings.push({ file: path.relative(process.cwd(), file), line: index + 1, text });
    }
  });
}

console.log(JSON.stringify({ findings, count: findings.length }, null, 2));
if (process.argv.includes('--strict') && findings.length) process.exit(1);
