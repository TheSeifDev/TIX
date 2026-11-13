import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ContextualFooter } from '@/components/layout/ContextualFooter';
import { Navbar } from '@/components/layout/Navbar';

type LegalKind = 'terms' | 'privacy';

const sectionKeys: Record<LegalKind, string[]> = {
  terms: ['acceptance', 'use', 'services', 'proposals', 'intellectualProperty', 'submittedMaterials', 'thirdParty', 'availability', 'liability', 'changes', 'contact'],
  privacy: ['scope', 'collected', 'submitted', 'use', 'sharing', 'cookies', 'retention', 'security', 'externalServices', 'requests', 'updates', 'contact'],
};

export async function LegalPage({ locale, kind }: { locale: Locale; kind: LegalKind }) {
  const t = await getTranslations({ locale, namespace: 'Legal' });
  const isArabic = locale === 'ar';
  const translate = (key: string) => t(key as never);
  const prefix = kind;

  return (
    <div lang={locale} dir={isArabic ? 'rtl' : 'ltr'} className="min-h-screen bg-[#100d0e] text-white">
      <Navbar arabic={isArabic} />
      <main id="main-content" className="mx-auto w-full max-w-6xl px-5 pb-24 pt-36 sm:px-10 lg:px-16">
        <header className="mx-auto max-w-4xl border-b border-white/15 pb-10 text-center">
          <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.24em] text-[#d58b8e]">TIX Studio</p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black uppercase leading-[0.92] tracking-[-0.06em] text-white">
            {t(`${prefix}.title` as never)}
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">{t(`${prefix}.intro` as never)}</p>
          <p className="mt-6 text-xs text-white/45">{t('lastUpdated' as never)}</p>
        </header>

        <article className="mx-auto mt-14 max-w-3xl space-y-10 text-[1rem] leading-8 text-white/80 sm:text-[1.08rem]">
          {sectionKeys[kind].map((key, index) => (
            <section key={key} className="border-b border-white/10 pb-9 last:border-b-0">
              <h2 className="mb-4 font-display text-xl font-bold leading-tight text-white sm:text-2xl">
                <span className="me-3 text-[#d58b8e]">{String(index + 1).padStart(2, '0')}</span>
                {translate(`${prefix}.sections.${key}.title`)}
              </h2>
              <p>{translate(`${prefix}.sections.${key}.body`)}</p>
            </section>
          ))}
          <div className="pt-2 text-center">
            <Link href="/contact" className="inline-flex rounded-full bg-[#8f080d] px-7 py-3 font-display text-sm font-bold text-white transition hover:bg-[#b20c14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              {t('contactCta' as never)}
            </Link>
          </div>
        </article>
      </main>
      <ContextualFooter page="home" arabic={isArabic} />
    </div>
  );
}
