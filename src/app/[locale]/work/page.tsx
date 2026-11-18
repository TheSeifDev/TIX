import { WorkContent } from '@/components/native-pages/WorkContent';
import { SitePage } from '@/components/layout/SitePage';
import { PageInteractions } from '@/components/PageInteractions';
import { type Locale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const url = locale === 'en' ? '/work' : '/ar/work';
  return { title: t('workTitle'), description: t('workDescription'), alternates: { canonical: url, languages: { en: '/work', ar: '/ar/work', 'x-default': '/work' } }, openGraph: { title: t('workTitle'), description: t('workDescription'), url, images: ['/assets/images/hero-bg.webp'] }, twitter: { card: 'summary_large_image', title: t('workTitle'), description: t('workDescription'), images: ['/assets/images/hero-bg.webp'] } };
}

export default async function Work({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <SitePage page="work" locale={locale}><WorkContent /><PageInteractions page="work" /></SitePage>;
}
