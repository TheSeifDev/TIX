import { ServicesContent } from '@/components/native-pages/ServicesContent';
import { SitePage } from '@/components/layout/SitePage';
import { PageInteractions } from '@/components/PageInteractions';
import { type Locale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const url = locale === 'en' ? '/services' : '/ar/services';
  return { title: t('servicesTitle'), description: t('servicesDescription'), alternates: { canonical: url, languages: { en: '/services', ar: '/ar/services', 'x-default': '/services' } }, openGraph: { title: t('servicesTitle'), description: t('servicesDescription'), url, images: ['/assets/images/hero-bg.webp'] }, twitter: { card: 'summary_large_image', title: t('servicesTitle'), description: t('servicesDescription'), images: ['/assets/images/hero-bg.webp'] } };
}

export default async function Services({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <SitePage page="services" locale={locale}><ServicesContent /><PageInteractions page="services" /></SitePage>;
}
