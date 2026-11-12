'use client';

import Image from 'next/image';

type SocialIconName = 'instagram' | 'facebook' | 'linkedin' | 'whatsapp' | 'tiktok';
type SocialLink = { label: string; href: string; icon: SocialIconName };

const socialLinks: SocialLink[] = [
  { label: 'TIX on Instagram', href: 'https://www.instagram.com/ajz_photographer?igsh=MXc1bDJ1aGNvOWFnZA==', icon: 'instagram' },
  { label: 'TIX on Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { label: 'TIX on LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
  { label: 'TIX on WhatsApp', href: 'https://www.whatsapp.com/', icon: 'whatsapp' },
  { label: 'TIX on TikTok', href: 'https://www.tiktok.com/', icon: 'tiktok' },
];

function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>;
  if (name === 'facebook') return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
  if (name === 'linkedin') return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
  if (name === 'whatsapp') return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M15 2h3.2c.2 1.9 1.2 3.3 3.2 3.8v3.3c-1.9-.1-3.7-.8-5.2-1.9v6.3a5.5 5.5 0 1 1-5.5-5.5c.4 0 .8 0 1.2.1v3.4a2.2 2.2 0 1 0 1 2V2z" /></svg>;
}

function InfoLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 flex items-center gap-2 font-display text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/60 before:block before:h-px before:w-3.5 before:bg-white/45">{children}</h3>;
}

export function ContactFooter() {
  return (
    <section className="relative isolate min-h-[720px] overflow-hidden bg-[#180506] text-white sm:min-h-[780px]" data-contact-footer aria-label="Contact information">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#bd8d8e_0%,#6c3337_24%,#30080d_54%,#060606_100%)]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[42%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,235,226,0.35),transparent_68%)]" aria-hidden="true" />
      <div className="relative mx-auto min-h-[720px] w-full max-w-[1440px] !px-5 !pb-5 !pt-5 sm:min-h-[780px] sm:!px-10 sm:!pt-8 lg:!px-16">
        <div className="pointer-events-none absolute left-1/2 top-[27%] z-10 h-[47%] w-[min(92%,1100px)] -translate-x-1/2 rounded-[72px_72px_0_0] bg-[linear-gradient(180deg,#a5070d_0%,#82050c_68%,#560308_100%)] shadow-[0_-18px_60px_rgba(173,0,12,0.18)]" aria-hidden="true" />
        <div className="relative z-20 mx-auto !mt-[clamp(4rem,9vw,8rem)] flex max-w-[1120px] items-start justify-between gap-3 font-display text-[clamp(1.45rem,4.4vw,4.6rem)] font-black leading-[0.9] tracking-[-0.05em] sm:!mt-[clamp(5rem,10vw,9rem)]"><h2 className="max-w-[38%] text-left max-[640px]:max-w-[32%]">Let&apos;s make<br />something</h2><h2 className="max-w-[38%] text-right max-[640px]:max-w-[32%]">impossible<br />to ignore.</h2></div>
        <Image className="pointer-events-none absolute !bottom-auto !left-1/2 !top-[7%] z-30 w-[clamp(220px,31vw,430px)] !-translate-x-1/2" src="/assets/images/contact_boy.webp" alt="TIX creative producer with a camera" width={832} height={833} priority data-contact-character />
        <div className="absolute inset-x-5 bottom-[13%] z-40 mx-auto flex max-w-[1120px] items-end justify-between gap-8 sm:inset-x-10 lg:inset-x-16"><div className="min-w-0 text-left"><InfoLabel>Contact Us</InfoLabel><div className="mb-5"><InfoLabel>Email</InfoLabel><a className="inline-flex rounded-full border border-white/70 px-3 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-[0.05em] text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="mailto:tix@gmail.com">TIX@GMAIL.COM</a></div><div><InfoLabel>Our Branches</InfoLabel><div className="flex flex-col items-start gap-1.5"><span className="rounded-full border border-white/60 px-3 py-1 font-display text-[0.62rem] font-semibold uppercase tracking-[0.04em] text-white">Alexandria, Elraml Station</span><span className="rounded-full border border-white/60 px-3 py-1 font-display text-[0.62rem] font-semibold uppercase tracking-[0.04em] text-white">Agami, Elbetash</span></div></div></div><div className="shrink-0 text-right"><InfoLabel>Follow Us</InfoLabel><div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-end">{socialLinks.map((social) => <a key={social.icon} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/65 text-white transition hover:bg-white hover:text-[#66070d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-10 sm:w-10"><SocialIcon name={social.icon} /></a>)}</div></div></div>
        <div className="absolute inset-x-5 bottom-5 z-40 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-white/20 pt-2 font-display text-[0.48rem] text-white/65 sm:inset-x-10 sm:text-[0.56rem] lg:inset-x-16"><span>© Copyright 2026, All Rights Reserved FOR TIX</span><nav className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Legal links"><a href="#support" className="transition hover:text-white">Support</a><a href="#terms" className="transition hover:text-white">Terms &amp; Conditions</a><a href="#privacy" className="transition hover:text-white">Privacy Policy</a></nav></div>
      </div>
    </section>
  );
}
