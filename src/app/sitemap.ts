import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tixstudio.com';
  return ['/', '/ar/', '/pages/about.html', '/pages/services.html', '/pages/work.html', '/pages/contact.html'].map((path) => ({ url: `${base}${path}`, changeFrequency: 'monthly', priority: path === '/' ? 1 : 0.7 }));
}
