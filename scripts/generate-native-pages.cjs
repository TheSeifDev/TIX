const fs = require('node:fs');
const path = require('node:path');

const pages = {
  HomeContent: 'index.html',
  ArabicHomeContent: path.join('ar', 'index.html'),
  AboutContent: path.join('legacy-pages', 'about.html'),
  ServicesContent: path.join('legacy-pages', 'services.html'),
  WorkContent: path.join('legacy-pages', 'work.html'),
  ContactContent: path.join('legacy-pages', 'contact.html'),
};
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'src', 'components', 'native-pages');
fs.mkdirSync(outDir, { recursive: true });

const camel = value => value.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
function styleObject(value) {
  const entries = value.split(';').map(part => part.trim()).filter(Boolean).map(part => {
    const split = part.indexOf(':');
    if (split < 0) return null;
    const key = part.slice(0, split).trim();
    const cssValue = part.slice(split + 1).trim();
    return `${JSON.stringify(key.startsWith('--') ? key : camel(key))}: ${JSON.stringify(cssValue)}`;
  }).filter(Boolean);
  return `style={{${entries.join(', ')}}}`;
}
function toJsx(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\sstyle="([^"]*)"/gi, (_, value) => ` ${styleObject(value)}`)
    .replace(/\bclass=/gi, 'className=')
    .replace(/\bfor=/gi, 'htmlFor=')
    .replace(/\btabindex=/gi, 'tabIndex=')
    .replace(/\bmaxlength=/gi, 'maxLength=')
    .replace(/\bminlength=/gi, 'minLength=')
    .replace(/\breadonly=/gi, 'readOnly=')
    .replace(/\bcolspan=/gi, 'colSpan=')
    .replace(/\browspan=/gi, 'rowSpan=')
    .replace(/\bcrossorigin=/gi, 'crossOrigin=')
    .replace(/\bfetchpriority=/gi, 'fetchPriority=')
    .replace(/\bstroke-width=/gi, 'strokeWidth=')
    .replace(/\bstroke-linecap=/gi, 'strokeLinecap=')
    .replace(/\bstroke-linejoin=/gi, 'strokeLinejoin=')
    .replace(/\bfill-rule=/gi, 'fillRule=')
    .replace(/\bclip-rule=/gi, 'clipRule=')
    .replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>(?!\s*<\/\1>)/gi, '<$1$2 />');
}
for (const [name, file] of Object.entries(pages)) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];
  if (!body) throw new Error(`No body found in ${file}`);
  const source = `/* eslint-disable */\n// @ts-nocheck\n'use client';\n\nexport function ${name}() {\n  return (\n    <>${toJsx(body)}\n    </>\n  );\n}\n`;
  fs.writeFileSync(path.join(outDir, `${name}.tsx`), source);
}
