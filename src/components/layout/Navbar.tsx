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
  const wasOpenRef = useRef(false);

  const localized = arabic
    ? [
        { href: '/work', label: 'الأعمال', key: 'work' },
        { href: '/services', label: 'الخدمات', key: 'services' },
        { href: '/about', label: 'الاستوديو', key: 'about' },
      ]
    : links;

  const isArabic = arabic || pathname === '/ar' || pathname.startsWith('/ar/');
  const languageHref = isArabic ? '/' : '/ar';
  const languageLabel = isArabic ? 'EN' : 'AR';
  const languageAccessibleName = isArabic ? 'Switch to English' : 'التبديل إلى العربية';

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Close the mobile menu after route navigation and return focus only when it was open.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    if (!menu) return;

    const background = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== menu && !element.contains(menu),
    );
    const previousInert = background.map((element) => element.inert);
    const previousOverflow = document.body.style.overflow;

    background.forEach((element) => {
      element.inert = true;
    });
    document.body.style.overflow = 'hidden';
    menu.querySelector<HTMLElement>('.mobile-menu__links a')?.focus();

    return () => {
      background.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (wasOpenRef.current && !open) buttonRef.current?.focus({ preventScroll: true });
    wasOpenRef.current = open;
  }, [open]);

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;

    const menu = menuRef.current;
    if (!menu) return;
    const focusable = Array.from(
      menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) {
      event.preventDefault();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {arabic ? 'انتقل إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>

      <nav
        className="nav"
        id="main-nav"
        aria-label={arabic ? 'التنقل الرئيسي' : 'Main navigation'}
        dir={arabic ? 'rtl' : undefined}
      >
        <div className="container">
          <div className="nav__inner">
            <Link href={arabic ? '/ar' : '/'} className="nav__logo" aria-label="TIX Home">
              <Image
                src="/assets/images/tix.webp"
                alt="TIX Logo"
                className="nav__logo-img"
                width={60}
                height={60}
                priority
              />
            </Link>

            <ul className="nav__links">
              {localized.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className={isActive(link.href) ? 'active' : undefined}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="nav__actions">
              <Link
                className="nav__language"
                href={languageHref}
                lang={isArabic ? 'en' : 'ar'}
                hrefLang={isArabic ? 'en' : 'ar'}
                aria-label={languageAccessibleName}
                title={languageAccessibleName}
              >
                {languageLabel}
              </Link>
              <Link href="/contact" className="nav__cta">
                <span>{arabic ? 'تواصل معنا' : 'Contact'}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 6h8M7 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <button
              ref={buttonRef}
              className={`nav__burger${open ? ' open' : ''}`}
              type="button"
              aria-label={arabic ? 'فتح قائمة التنقل' : 'Toggle menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={menuRef}
        className={`mobile-menu${open ? ' open' : ''}`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={arabic ? 'التنقل' : 'Navigation'}
        hidden={!open}
        dir={arabic ? 'rtl' : undefined}
        onKeyDown={handleMenuKeyDown}
      >
        <nav className="mobile-menu__links">
          {localized.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={languageHref}
            lang={isArabic ? 'en' : 'ar'}
            hrefLang={isArabic ? 'en' : 'ar'}
            onClick={() => setOpen(false)}
          >
            {isArabic ? 'English' : 'العربية'}
          </Link>
        </nav>
        <div className="mobile-menu__cta">
          <Link href="/contact" onClick={() => setOpen(false)}>
            {arabic ? 'لنبدأ مشروعك' : "Let's Build It ->"}
          </Link>
        </div>
        <div className="mobile-menu__meta">TIX - Alexandria / Est. 2025</div>
      </div>
    </>
  );
}
