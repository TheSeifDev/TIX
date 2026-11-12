import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tixstudio.com';
  return ['/', '/ar', '/about', '/services', '/work', '/contact'].map((path) => ({ url: `${base}${path}`, changeFrequency: 'monthly', priority: path === '/' ? 1 : 0.7 }));
}
