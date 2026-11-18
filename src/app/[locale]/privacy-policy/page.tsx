import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LegalPage } from '@/components/legal/LegalPage';
import { type Locale } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const url = locale === 'en' ? '/privacy-policy' : '/ar/privacy-policy';
  return { title: t('privacyTitle'), description: t('privacyDescription'), alternates: { canonical: url, languages: { en: '/privacy-policy', ar: '/ar/privacy-policy', 'x-default': '/privacy-policy' } }, openGraph: { title: t('privacyTitle'), description: t('privacyDescription'), url }, twitter: { card: 'summary', title: t('privacyTitle'), description: t('privacyDescription') } };
}

export default async function PrivacyPolicy({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <LegalPage locale={locale} kind="privacy" />;
}
