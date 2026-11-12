const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const sourceRoot = path.join(root, 'assets', 'images');
const assetFiles = [];
function walk(dir) { for (const entry of fs.readdirSync(dir, { withFileTypes: true })) { const full = path.join(dir, entry.name); if (entry.isDirectory()) walk(full); else if (/\.(png|jpe?g)$/i.test(full)) assetFiles.push(path.relative(sourceRoot, full).replaceAll('\\', '/')); } }
walk(sourceRoot);
const collisionStems = new Set(assetFiles.map(rel => rel.replace(/\.(png|jpe?g)$/i, '').toLowerCase()).filter((stem, index, all) => all.indexOf(stem) !== index));
const webpRelative = rel => { const match = rel.match(/^(.*)\.(png|jpe?g)$/i); const ext = match[2].toLowerCase().replace('jpeg', 'jpg'); return `${match[1]}${collisionStems.has(match[1].toLowerCase()) ? `-${ext}` : ''}.webp`; };
const targets = [path.join(root, 'src'), path.join(root, 'css')];
function sourceFiles(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => { const full = path.join(dir, entry.name); return entry.isDirectory() ? sourceFiles(full) : /\.(tsx|ts|css)$/i.test(full) ? [full] : []; }); }
let updated = 0;
for (const file of targets.flatMap(sourceFiles)) {
  const original = fs.readFileSync(file, 'utf8');
  let text = original;
  for (const rel of assetFiles) {
    const webp = webpRelative(rel);
    for (const prefix of ['assets/images/', '../assets/images/', '/assets/images/', './assets/images/']) {
      text = text.replaceAll(`${prefix}${rel}`, `${prefix}${webp}`);
    }
  }
  if (text !== original) { fs.writeFileSync(file, text); updated += 1; }
}
fs.cpSync(path.join(root, 'css'), path.join(root, 'public', 'css'), { recursive: true });
const manifest = path.join(root, 'docs', 'performance', 'WEBP-ASSET-MANIFEST.csv');
if (fs.existsSync(manifest)) fs.writeFileSync(manifest, fs.readFileSync(manifest, 'utf8').replaceAll(',"pending"', ',"updated in source scan"'));
console.log(`Scanned ${updated} application source files and synchronized public CSS.`);
