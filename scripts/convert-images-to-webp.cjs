const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const sourceRoot = path.join(root, 'assets', 'images');
const publicRoot = path.join(root, 'public', 'assets', 'images');
const rows = [['original_file','original_bytes','webp_file','webp_bytes','width','height','quality','status','references_updated']];
const eligible = /\.(png|jpe?g)$/i;
function files(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => { const full = path.join(dir, entry.name); return entry.isDirectory() ? files(full) : [full]; }); }
function relative(file) { return path.relative(sourceRoot, file).replaceAll('\\', '/'); }
const sources = files(sourceRoot).filter(file => eligible.test(file));
const collisions = new Set(sources.map(file => relative(file).replace(/\.(png|jpe?g)$/i, '').toLowerCase()).filter((stem, index, all) => all.indexOf(stem) !== index));
function webpRelative(rel) { const match = rel.match(/^(.*)\.(png|jpe?g)$/i); const stem = match[1]; const ext = match[2].toLowerCase().replace('jpeg', 'jpg'); return `${stem}${collisions.has(stem.toLowerCase()) ? `-${ext}` : ''}.webp`; }

(async () => {
  for (const source of sources) {
    const rel = relative(source);
    const webpRel = webpRelative(rel);
    const dest = path.join(sourceRoot, webpRel);
    const publicDest = path.join(publicRoot, webpRel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.mkdirSync(path.dirname(publicDest), { recursive: true });
    const info = await sharp(source).metadata();
    await sharp(source).webp({ quality: 82, alphaQuality: 90, effort: 5 }).toFile(dest);
    fs.copyFileSync(dest, publicDest);
    rows.push([`assets/images/${rel}`, fs.statSync(source).size, `assets/images/${webpRel}`, fs.statSync(dest).size, info.width ?? '', info.height ?? '', 82, 'converted', 'pending']);
  }
  const manifestDir = path.join(root, 'docs', 'performance');
  fs.mkdirSync(manifestDir, { recursive: true });
  fs.writeFileSync(path.join(manifestDir, 'WEBP-ASSET-MANIFEST.csv'), rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n') + '\n');
  console.log(`Converted ${rows.length - 1} eligible raster assets.`);
})().catch(error => { console.error(error); process.exit(1); });
