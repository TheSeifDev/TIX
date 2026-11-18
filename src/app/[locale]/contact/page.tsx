import { ContactContent } from '@/components/native-pages/ContactContent';
import { SitePage } from '@/components/layout/SitePage';
import { PageInteractions } from '@/components/PageInteractions';
import { type Locale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const url = locale === 'en' ? '/contact' : '/ar/contact';
  return { title: t('contactTitle'), description: t('contactDescription'), alternates: { canonical: url, languages: { en: '/contact', ar: '/ar/contact', 'x-default': '/contact' } }, openGraph: { title: t('contactTitle'), description: t('contactDescription'), url, images: ['/assets/images/hero-bg.webp'] }, twitter: { card: 'summary_large_image', title: t('contactTitle'), description: t('contactDescription'), images: ['/assets/images/hero-bg.webp'] } };
}

export default async function Contact({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <SitePage contact locale={locale}><ContactContent /><PageInteractions page="contact" /></SitePage>;
}
