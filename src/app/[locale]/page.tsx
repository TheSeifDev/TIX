import { HomeContent } from '@/components/native-pages/HomeContent';
import { SitePage } from '@/components/layout/SitePage';
import { PageInteractions } from '@/components/PageInteractions';
import { type Locale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('homeTitle'), description: t('homeDescription'), alternates: { canonical: locale === 'en' ? '/' : '/ar', languages: { en: '/', ar: '/ar', 'x-default': '/' } }, openGraph: { title: t('homeTitle'), description: t('homeDescription'), url: locale === 'en' ? '/' : '/ar', images: ['/assets/images/hero-bg.webp'] }, twitter: { card: 'summary_large_image', title: t('homeTitle'), description: t('homeDescription'), images: ['/assets/images/hero-bg.webp'] } };
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <SitePage page="home" locale={locale}><HomeContent /><PageInteractions page="home" /></SitePage>;
}
