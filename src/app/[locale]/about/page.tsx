import { AboutContent } from '@/components/native-pages/AboutContent';
import { SitePage } from '@/components/layout/SitePage';
import { PageInteractions } from '@/components/PageInteractions';
import { type Locale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const url = locale === 'en' ? '/about' : '/ar/about';
  return { title: t('aboutTitle'), description: t('aboutDescription'), alternates: { canonical: url, languages: { en: '/about', ar: '/ar/about', 'x-default': '/about' } }, openGraph: { title: t('aboutTitle'), description: t('aboutDescription'), url, images: ['/assets/images/hero-bg.webp'] }, twitter: { card: 'summary_large_image', title: t('aboutTitle'), description: t('aboutDescription'), images: ['/assets/images/hero-bg.webp'] } };
}

export default async function About({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <SitePage page="about" locale={locale}><AboutContent /><PageInteractions page="about" /></SitePage>;
}
