import type { Metadata } from 'next';

const siteName = 'TIX Studio';
const socialImage = '/assets/images/hero-bg.webp';

export function pageMetadata(title: string, description: string, path: string, languages?: Record<string, string>): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    openGraph: {
      type: 'website',
      siteName,
      title,
      description,
      url: path,
      images: [{ url: socialImage, width: 1920, height: 1080, alt: 'TIX Studio creative work' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },
  };
}
