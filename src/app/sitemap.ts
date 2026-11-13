import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tixstudio.com';
  const pairs = [
    ['/', '/ar'],
    ['/about', '/ar/about'],
    ['/services', '/ar/services'],
    ['/work', '/ar/work'],
    ['/contact', '/ar/contact'],
    ['/terms-and-conditions', '/ar/terms-and-conditions'],
    ['/privacy-policy', '/ar/privacy-policy'],
  ] as const;
  return pairs.flatMap(([english, arabic]) => [
    { url: `${base}${english}`, alternates: { languages: { en: `${base}${english}`, ar: `${base}${arabic}`, 'x-default': `${base}${english}` } }, changeFrequency: 'monthly' as const, priority: english === '/' ? 1 : 0.7 },
    { url: `${base}${arabic}`, alternates: { languages: { en: `${base}${english}`, ar: `${base}${arabic}`, 'x-default': `${base}${english}` } }, changeFrequency: 'monthly' as const, priority: 0.7 },
  ]);
}
