import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

const images = {
  home: ['home-01.webp', 'home-02.webp', 'home-03.webp'],
  about: ['about-01.webp', 'about-02.webp', 'about-03.webp'],
  services: ['services-01.webp', 'services-02.webp', 'services-03.webp'],
  work: ['work-01.webp', 'work-02.webp', 'work-03.webp'],
} as const;

export async function ContextualFooter({ page = 'home', arabic = false }: { page?: keyof typeof images; arabic?: boolean }) {
  const t = await getTranslations();
  return <section className="tix-section" dir={arabic ? 'rtl' : undefined}>
    <div className="tix-bg-glow" /><div className="tix-vignette" />
    <div className="folder-stage"><div className="folder" id="folder" role="img" aria-label={t('Footer.folder')}><div className="folder__tab" /><div className="folder__back"><div className="folder__images">{images[page].map((image, index) => <div className="img-card" key={image}><Image src={`/assets/images/footer-placeholders/${image}`} alt={`${t('Footer.imageAlt')} ${index + 1}`} width={400} height={300} loading="lazy" /></div>)}</div></div><div className="folder__front" /></div></div>
    <div className="cta-card"><div className="cta-logo" aria-hidden="true"><Image src="/assets/images/fire.webp" alt="" width={170} height={88} loading="lazy" /></div><div className="cta-inner"><h2 className="cta-headline">{t('HomePage.footerHeadline')}</h2><p className="cta-sub">{t('HomePage.footerDescription')}</p><Link href="/contact" className="cta-btn">{t('Common.letsBuild')}</Link></div></div>
    <footer className="tix-footer"><div className="tix-footer__inner"><ul className="tix-footer__links"><li><Link href="/contact">{t('Footer.support')}</Link></li><li><Link href="/terms-and-conditions">{t('Footer.terms')}</Link></li><li><Link href="/privacy-policy">{t('Footer.privacy')}</Link></li></ul><span className="tix-footer__copy">{t('Footer.copyright')}</span></div></footer>
  </section>;
}
