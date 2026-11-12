import Image from 'next/image';
import Link from 'next/link';

const images = {
  home: ['home-01.webp', 'home-02.webp', 'home-03.webp'],
  about: ['about-01.webp', 'about-02.webp', 'about-03.webp'],
  services: ['services-01.webp', 'services-02.webp', 'services-03.webp'],
  work: ['work-01.webp', 'work-02.webp', 'work-03.webp'],
} as const;

export function ContextualFooter({ page = 'home', arabic = false }: { page?: keyof typeof images; arabic?: boolean }) {
  return <section className="tix-section" dir={arabic ? 'rtl' : undefined}>
    <div className="tix-bg-glow" /><div className="tix-vignette" />
    <div className="folder-stage"><div className="folder" id="folder" role="img" aria-label="Folder with project images"><div className="folder__tab" /><div className="folder__back"><div className="folder__images">{images[page].map((image, index) => <div className="img-card" key={image}><Image src={`/assets/images/footer-placeholders/${image}`} alt={`TIX ${page} footer image ${index + 1}`} width={400} height={300} loading="lazy" /></div>)}</div></div><div className="folder__front" /></div></div>
    <div className="cta-card"><div className="cta-logo" aria-hidden="true"><Image src="/assets/images/fire.webp" alt="" width={170} height={88} loading="lazy" /></div><div className="cta-inner"><h2 className="cta-headline">{arabic ? 'لنصنع معًا ما لا يمكن تجاهله.' : "Let's make something impossible to ignore."}</h2><p className="cta-sub">{arabic ? 'استراتيجية وإنتاج وتجارب رقمية تترك أثرًا.' : 'Creative direction, production, and digital experiences designed to leave a mark.'}</p><Link href="/contact" className="cta-btn">{arabic ? 'لنبدأ مشروعك' : "Let's Build It ->"}</Link></div></div>
    <footer className="tix-footer"><div className="tix-footer__inner"><ul className="tix-footer__links"><li><a href="#">{arabic ? 'الدعم' : 'Support'}</a></li><li><a href="#">{arabic ? 'الشروط والأحكام' : 'Terms & Conditions'}</a></li><li><a href="#">{arabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</a></li></ul><span className="tix-footer__copy">© Copyright 2026, All Rights Reserved FOR TIX</span></div></footer>
  </section>;
}
