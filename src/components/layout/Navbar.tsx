'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const links = {
  en: [
    { href: '/work', label: 'Work', key: 'work' },
    { href: '/services', label: 'Services', key: 'services' },
    { href: '/about', label: 'Studio', key: 'about' },
  ],
  ar: [
    { href: '/work', label: 'الأعمال', key: 'work' },
    { href: '/services', label: 'الخدمات', key: 'services' },
    { href: '/about', label: 'الاستوديو', key: 'about' },
  ],
};

export function Navbar({ arabic = false }: { arabic?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  const isArabic = arabic || pathname === '/ar' || pathname.startsWith('/ar/');
  const localized = isArabic ? links.ar : links.en;
  const languageHref = isArabic ? '/' : '/ar';
  const languageLabel = isArabic ? 'EN' : 'AR';
  const languageAccessibleName = isArabic ? 'Switch to English' : 'التبديل إلى العربية';

  // Font + casing: Arabic has no uppercase / letter-spacing
  const labelFont = isArabic
    ? "font-['Noto_Sans_Arabic',Tahoma,sans-serif] tracking-normal"
    : 'font-[family-name:var(--font-display)] uppercase tracking-[0.08em]';

  // Scroll state -> stronger glass
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the menu
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

  // Close after route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background (inert + scroll) while open, focus first link
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
    menu.querySelector<HTMLElement>('[data-menu-links] a')?.focus();

    return () => {
      background.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Return focus to the burger only after it was open
  useEffect(() => {
    if (wasOpenRef.current && !open) buttonRef.current?.focus({ preventScroll: true });
    wasOpenRef.current = open;
  }, [open]);

  // Close the menu if the viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

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
      <a
        href="#main-content"
        className="fixed start-4 top-4 z-[1200] -translate-y-24 rounded-full bg-white !px-4 !py-2 text-sm font-semibold text-black transition-transform focus:translate-y-0"
      >
        {isArabic ? 'انتقل إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>

      {/* ============ NAV BAR ============ */}
      <nav
        id="main-nav"
        aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'}
        dir={isArabic ? 'rtl' : undefined}
        className={[
          'fixed left-1/2 top-3 z-[1000] h-14 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 rounded-2xl border backdrop-blur-xl backdrop-saturate-150',
          'sm:top-4 md:h-[60px] md:rounded-full',
          'transition-[background-color,border-color,box-shadow] duration-300',
          scrolled
            ? 'border-white/15 bg-neutral-950/80 shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
            : 'border-white/10 bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.1)]',
        ].join(' ')}
      >
        <div className="grid h-full w-full grid-cols-[1fr_auto] items-center !ps-5 !pe-2.5 md:grid-cols-[1fr_auto_1fr] md:!px-5">
          {/* Logo: centered on mobile, start-aligned on desktop */}
          <Link
            href={isArabic ? '/ar' : '/'}
            aria-label="TIX Home"
            className="flex items-center justify-self-start rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/60 max-md:absolute max-md:start-1/2 max-md:-translate-x-1/2 max-md:rtl:translate-x-1/2"
          >
            <Image
              src="/assets/images/tix.webp"
              alt="TIX Logo"
              width={120}
              height={40}
              priority
              className="h-9 w-auto object-contain md:h-10"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-2 md:flex">
            {localized.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'relative block rounded-full !px-5 !py-2.5 text-xs font-semibold outline-none transition-colors',
                      'focus-visible:ring-2 focus-visible:ring-white/60',
                      labelFont,
                      active ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white',
                      'after:absolute after:inset-x-5 after:bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-red-500',
                      'after:transition-transform after:duration-300 rtl:after:origin-right',
                      active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                    ].join(' ')}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center justify-self-end gap-3 md:flex">
            <Link
              href={languageHref}
              lang={isArabic ? 'en' : 'ar'}
              hrefLang={isArabic ? 'en' : 'ar'}
              aria-label={languageAccessibleName}
              title={languageAccessibleName}
              className="inline-flex min-w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 !px-4 !py-2.5 font-[family-name:var(--font-display)] text-[11px] font-bold leading-none text-white/80 outline-none transition-colors hover:border-white/35 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/60"
            >
              {languageLabel}
            </Link>
            <Link
              href="/contact"
              className={[
                'group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#7a0a0a] !px-6 !py-3 text-xs font-bold text-white outline-none',
                'transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a31212] hover:shadow-[0_10px_30px_rgba(122,10,10,0.45)]',
                'focus-visible:ring-2 focus-visible:ring-white/60',
                labelFont,
              ].join(' ')}
            >
              <span>{isArabic ? 'تواصل معنا' : 'Contact'}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              >
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

          {/* Burger (mobile only) — clean, no heavy box/shadow */}
          <button
            ref={buttonRef}
            type="button"
            aria-label={isArabic ? 'فتح قائمة التنقل' : 'Toggle menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={[
              'relative z-[2] col-start-2 justify-self-end grid size-10 place-items-center rounded-full outline-none md:hidden',
              'bg-white/[0.06] ring-1 ring-inset ring-white/10 transition-colors duration-200',
              'hover:bg-white/10 active:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/60',
            ].join(' ')}
          >
            <span className="relative block h-3.5 w-[18px]" aria-hidden="true">
              <span
                className={`absolute inset-x-0 top-0 h-[2px] rounded-full bg-white transition-transform duration-300 ${
                  open ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white transition-all duration-200 ${
                  open ? 'scale-x-0 opacity-0' : ''
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-white transition-transform duration-300 ${
                  open ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* ============ MOBILE MENU ============ */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={isArabic ? 'التنقل' : 'Navigation'}
        aria-hidden={!open}
        dir={isArabic ? 'rtl' : undefined}
        onKeyDown={handleMenuKeyDown}
        className={[
          'fixed inset-0 z-[1100] flex flex-col bg-black !px-6 !pb-8 !pt-4 md:hidden',
          'bg-[radial-gradient(circle_at_85%_8%,rgba(139,0,0,0.28),transparent_40%)]',
          'transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          open
            ? 'visible translate-x-0 opacity-100'
            : `pointer-events-none invisible opacity-0 ${isArabic ? '-translate-x-full' : 'translate-x-full'}`,
        ].join(' ')}
      >
        {/* Menu header: logo + close */}
        <div className="flex h-14 items-center justify-between">
          <Link
            href={isArabic ? '/ar' : '/'}
            aria-label="TIX Home"
            onClick={() => setOpen(false)}
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Image src="/assets/images/tix.webp" alt="" width={120} height={40} className="h-10 w-auto object-contain" />
          </Link>
          <button
            type="button"
            aria-label={isArabic ? 'إغلاق القائمة' : 'Close menu'}
            onClick={() => setOpen(false)}
            className="grid size-10 place-items-center rounded-full bg-white/[0.06] text-white ring-1 ring-inset ring-white/10 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav data-menu-links className="!mt-10 flex flex-col">
          {localized.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={[
                  'border-b border-white/10 !py-4 text-[clamp(2rem,9vw,3.25rem)] font-black leading-none outline-none transition-colors',
                  'focus-visible:text-white',
                  isArabic
                    ? "font-['Noto_Sans_Arabic',Tahoma,sans-serif]"
                    : 'font-[family-name:var(--font-display)] uppercase tracking-tight',
                  active ? 'text-white' : 'text-white/40 hover:text-white',
                ].join(' ')}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={languageHref}
            lang={isArabic ? 'en' : 'ar'}
            hrefLang={isArabic ? 'en' : 'ar'}
            onClick={() => setOpen(false)}
            className="border-b border-white/10 !py-4 text-lg font-semibold text-white/50 outline-none transition-colors hover:text-white focus-visible:text-white"
          >
            {isArabic ? 'English' : 'العربية'}
          </Link>
        </nav>

        <div className="!mt-8">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={[
              'inline-flex items-center rounded-full bg-[#7a0a0a] !px-8 !py-3.5 text-sm font-bold text-white outline-none transition-colors',
              'hover:bg-[#a31212] focus-visible:ring-2 focus-visible:ring-white/60',
              labelFont,
            ].join(' ')}
          >
            {isArabic ? 'لنبدأ مشروعك' : "Let's build it"}
          </Link>
        </div>

        <p
          className={`!mt-auto !pt-8 text-[11px] text-white/40 ${
            isArabic ? 'tracking-normal' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.15em]'
          }`}
        >
          TIX — Alexandria / Est. 2025
        </p>
      </div>
    </>
  );
}