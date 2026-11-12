import fs from 'node:fs';
import path from 'node:path';

const sources = {
  home: 'index.html',
  arabic: path.join('ar', 'index.html'),
  about: path.join('legacy-pages', 'about.html'),
  services: path.join('legacy-pages', 'services.html'),
  work: path.join('legacy-pages', 'work.html'),
  contact: path.join('legacy-pages', 'contact.html'),
} as const;

export type LegacyPageKey = keyof typeof sources;

export function getLegacyBody(key: LegacyPageKey): string {
  const sourcePath = {
    home: path.join(process.cwd(), 'index.html'),
    arabic: path.join(process.cwd(), 'ar', 'index.html'),
    about: path.join(process.cwd(), 'legacy-pages', 'about.html'),
    services: path.join(process.cwd(), 'legacy-pages', 'services.html'),
    work: path.join(process.cwd(), 'legacy-pages', 'work.html'),
    contact: path.join(process.cwd(), 'legacy-pages', 'contact.html'),
  }[key];
  const source = fs.readFileSync(/* turbopackIgnore: true */ sourcePath, 'utf8');
  const match = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!match) throw new Error(`Legacy page ${key} has no body`);
  return match[1]
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<!-- NAV injected by layout\.js -->/gi, '');
}
