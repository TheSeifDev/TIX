'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const links = [
  { href: '/work', label: 'Work', key: 'work' },
  { href: '/services', label: 'Services', key: 'services' },
  { href: '/about', label: 'Studio', key: 'about' },
];

export function Navbar({ arabic = false }: { arabic?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const localized = arabic ? [
    { href: '/work', label: 'الأعمال', key: 'work' },
    { href: '/services', label: 'الخدمات', key: 'services' },
    { href: '/about', label: 'الاستوديو', key: 'about' },
  ] : links;
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  useEffect(() => { if (!open) buttonRef.current?.focus({ preventScroll: true }); }, [open]);
  const active = (key: string) => pathname.includes(key);
  return (
    <>
      <a className="skip-link" href="#main-content">{arabic ? 'انتقل إلى المحتوى الرئيسي' : 'Skip to main content'}</a>
      <nav className="nav" id="main-nav" aria-label={arabic ? 'التنقل الرئيسي' : 'Main navigation'} dir={arabic ? 'rtl' : undefined}>
        <div className="container"><div className="nav__inner">
          <Link href={arabic ? '/ar/' : '/'} className="nav__logo" aria-label="TIX Home"><Image src="/assets/images/tix.webp" alt="TIX Logo" className="nav__logo-img" width={60} height={60} priority /></Link>
          <ul className="nav__links">{localized.map(link => <li key={link.key}><Link href={link.href} className={active(link.key) ? 'active' : undefined}>{link.label}</Link></li>)}</ul>
          <div className="nav__actions">
            <Link href="/contact" className="nav__cta"><span>{arabic ? 'تواصل معنا' : 'Contact'}</span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
            {(pathname === '/' || pathname.startsWith('/ar')) && <Link className="nav__language" href={arabic ? '/' : '/ar/'} lang={arabic ? 'en' : 'ar'} hrefLang={arabic ? 'en' : 'ar'}>{arabic ? 'EN' : 'AR'}</Link>}
          </div>
          <button ref={buttonRef} className="nav__burger" type="button" aria-label={arabic ? 'فتح قائمة التنقل' : 'Toggle menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(value => !value)}><span /><span /><span /></button>
        </div></div>
      </nav>
      <div ref={menuRef} className={`mobile-menu${open ? ' is-open' : ''}`} id="mobile-menu" role="dialog" aria-modal="true" aria-label={arabic ? 'التنقل' : 'Navigation'} hidden={!open} style={{ display: open ? undefined : 'none' }} dir={arabic ? 'rtl' : undefined}>
        <nav className="mobile-menu__links">{localized.map(link => <Link key={link.key} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>
        <div className="mobile-menu__cta"><Link href="/contact" onClick={() => setOpen(false)}>{arabic ? 'لنبدأ مشروعك' : "Let's Build It ->"}</Link></div>
        <div className="mobile-menu__meta">TIX - Alexandria / Est. 2025</div>
      </div>
    </>
  );
}
