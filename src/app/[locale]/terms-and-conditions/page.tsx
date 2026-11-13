import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LegalPage } from '@/components/legal/LegalPage';
import { type Locale } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const url = locale === 'en' ? '/terms-and-conditions' : '/ar/terms-and-conditions';
  return { title: t('termsTitle'), description: t('termsDescription'), alternates: { canonical: url, languages: { en: '/terms-and-conditions', ar: '/ar/terms-and-conditions', 'x-default': '/terms-and-conditions' } }, openGraph: { title: t('termsTitle'), description: t('termsDescription'), url }, twitter: { card: 'summary', title: t('termsTitle'), description: t('termsDescription') } };
}

export default async function TermsAndConditions({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <LegalPage locale={locale} kind="terms" />;
}
