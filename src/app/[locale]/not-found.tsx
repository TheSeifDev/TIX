import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('NotFound');
  return <main className="grid min-h-screen place-items-center bg-black px-6 text-center text-white"><div><h1 className="font-display text-5xl font-black">{t('title')}</h1><p className="mt-4 text-white/70">{t('description')}</p><Link href="/" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-black">{t('backHome')}</Link></div></main>;
}
