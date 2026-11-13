'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from 'react-icons/fa';

const socialLinks = [
  { label: 'TIX on Instagram', href: 'https://www.instagram.com/ajz_photographer?igsh=MXc1bDJ1aGNvOWFnZA==', icon: FaInstagram, color: 'hover:border-[#E1306C]', iconColor: 'group-hover:!text-[#E1306C]', background: 'bg-[#E1306C]' },
  { label: 'TIX on Facebook', href: 'https://www.facebook.com/', icon: FaFacebookF, color: 'hover:border-[#1877F2]', iconColor: 'group-hover:!text-[#1877F2]', background: 'bg-[#1877F2]' },
  { label: 'TIX on LinkedIn', href: 'https://www.linkedin.com/', icon: FaLinkedinIn, color: 'hover:border-[#0A66C2]', iconColor: 'group-hover:!text-[#0A66C2]', background: 'bg-[#0A66C2]' },
  { label: 'TIX on WhatsApp', href: 'https://www.whatsapp.com/', icon: FaWhatsapp, color: 'hover:border-[#25D366]', iconColor: 'group-hover:!text-[#25D366]', background: 'bg-[#25D366]' },
  { label: 'TIX on TikTok', href: 'https://www.tiktok.com/', icon: FaTiktok, color: 'hover:border-[#25F4EE]', iconColor: 'group-hover:!text-[#25F4EE]', background: 'bg-black' },
] as const;

function InfoLabel({ children, large = false }: { children: React.ReactNode; large?: boolean }) {
  if (large) {
    return <h3 className="!mb-[2.2rem] font-display text-[clamp(2rem,5vw,3.4rem)] font-black uppercase leading-none tracking-[-0.04em] text-white [text-shadow:2px_2px_0_#080404,-2px_-2px_0_#080404,2px_-2px_0_#080404,-2px_2px_0_#080404] max-[640px]:!mb-2 max-[640px]:!text-[1.35rem]">{children}</h3>;
  }
  return <h3 className="!mb-2 flex items-center gap-2 font-display text-[clamp(0.75rem,1.7vw,1.25rem)] font-bold uppercase tracking-[0.12em] text-white/75 before:block before:h-px before:w-3.5 before:bg-white/55 max-[640px]:!mb-1 max-[640px]:!gap-1 max-[640px]:!text-[0.55rem] max-[640px]:!tracking-[0.14em]">{children}</h3>;
}

export function ContactFooter() {
  const t = useTranslations();
  const socialLabels = ['instagram', 'facebook', 'linkedin', 'whatsapp', 'tiktok'] as const;
  return (
    <section className="relative left-1/2 isolate w-screen -translate-x-1/2 min-h-[1040px] overflow-hidden bg-[#180506] text-white sm:min-h-[1040px] max-[640px]:!h-[430px] max-[640px]:!min-h-0" data-contact-footer aria-label={t('ContactPage.contactInformation')}>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#bd8d8e_0%,#6c3337_24%,#30080d_54%,#060606_100%)]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[42%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,235,226,0.35),transparent_68%)]" aria-hidden="true" />
      <div className="relative mx-auto flow-root min-h-[1040px] w-full max-w-[1440px] !px-5 !pb-5 !pt-0 sm:min-h-[1040px] sm:!px-10 sm:!pt-0 lg:!px-16 max-[640px]:!absolute max-[640px]:!inset-0 max-[640px]:!h-[430px] max-[640px]:!min-h-0 max-[640px]:!px-4 max-[640px]:!pt-0">
        <div data-contact-panel className="pointer-events-none absolute bottom-0 left-1/2 top-[36%] z-10 w-[min(92%,1100px)] -translate-x-1/2 rounded-[72px_72px_0_0] bg-[linear-gradient(to_top,rgba(0,0,0,0.52)_0%,transparent_38%),linear-gradient(180deg,#a5070d_0%,#82050c_68%,#560308_100%)] shadow-[0_-18px_60px_rgba(173,0,12,0.18)] max-[640px]:!top-[38%] max-[640px]:!w-[calc(100%-2rem)] max-[640px]:!rounded-[42px_42px_0_0]" aria-hidden="true" />
        <div className="relative z-20 mx-auto !mt-[clamp(3.5rem,7vw,4.5rem)] flex max-w-[1120px] items-start justify-between gap-3 font-display text-[clamp(1.45rem,4.4vw,4.6rem)] font-black leading-[0.9] tracking-[-0.05em] max-[640px]:!mt-[2.2rem] max-[640px]:!gap-1 max-[640px]:!text-[1.25rem]"><h2 className="max-w-[38%] whitespace-pre-line text-left max-[640px]:max-w-[31%]">{t('ContactPage.contactIntroFirst')}</h2><h2 className="max-w-[38%] whitespace-pre-line !translate-x-6 !pt-[9rem] text-right max-[640px]:max-w-[31%] max-[640px]:!translate-x-2 max-[640px]:!pt-[3.8rem]">{t('ContactPage.contactIntroSecond')}</h2></div>
        <Image className="pointer-events-none absolute !bottom-auto !left-1/2 !-translate-x-1/2 z-30 w-[min(70vw,600px)] !top-[-1.3%] max-[640px]:!top-[0%] max-[640px]:!w-[clamp(250px,67vw,270px)]" src="/assets/images/contact_boy.webp" alt={t('ContactPage.characterAlt')} width={832} height={833} priority data-contact-character />
        <div className="absolute left-1/2 top-[52%] z-40 flex w-[min(92%,1100px)] -translate-x-1/2 items-start justify-between gap-8 !px-11 max-[640px]:!left-5 max-[640px]:!top-[54%] max-[640px]:!w-[calc(100%-2.5rem)] max-[640px]:!translate-x-0 max-[640px]:!gap-2 max-[640px]:!px-0"><div className="min-w-0 text-left"><InfoLabel large>{t('ContactPage.contactUs')}</InfoLabel><div className="!mb-[4rem] max-[640px]:!mb-1"><InfoLabel>{t('ContactPage.emailLabel')}</InfoLabel><a dir="ltr" className="inline-flex rounded-full border border-white/70 !px-4 !py-2 font-display text-[clamp(0.8rem,1.5vw,1.25rem)] font-semibold uppercase tracking-[0.05em] text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-[640px]:!px-1.5 max-[640px]:!py-0.5 max-[640px]:!text-[0.47rem]" href="mailto:tix@gmail.com">TIX@GMAIL.COM</a></div><div><InfoLabel>{t('ContactPage.branchesLabel')}</InfoLabel><div className="flex flex-col items-start gap-2 max-[640px]:!gap-0.5"><span dir="ltr" className="rounded-full border border-white/60 !px-4 !py-2 font-display text-[clamp(0.8rem,1.5vw,1.2rem)] font-semibold uppercase tracking-[0.04em] text-white max-[640px]:!px-1.5 max-[640px]:!py-0.5 max-[640px]:!text-[0.45rem]">Alexandria, Elraml Station</span><span dir="ltr" className="rounded-full border border-white/60 !px-4 !py-2 font-display text-[clamp(0.8rem,1.5vw,1.2rem)] font-semibold uppercase tracking-[0.04em] text-white max-[640px]:!px-1.5 max-[640px]:!py-0.5 max-[640px]:!text-[0.45rem]">Agami, Elbetash</span></div></div></div><div className="shrink-0 !translate-x-[-1.25rem] !pt-[5rem] text-right max-[640px]:!translate-x-0 max-[640px]:!pt-0"><InfoLabel>{t('ContactPage.followUs')}</InfoLabel><div className="grid grid-cols-3 gap-2 max-[640px]:!grid-cols-3 max-[640px]:!gap-1">{socialLinks.map((social, index) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={t(`Accessibility.${socialLabels[index]}`)} className={`group flex h-12 w-12 items-center justify-center rounded-full border border-transparent !p-3 text-white transition hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-[640px]:!h-7 max-[640px]:!w-7 max-[640px]:!p-2 ${social.background} ${social.color}`}><social.icon aria-hidden="true" className={`h-4 w-4 max-[640px]:!h-3 max-[640px]:!w-3 ${social.iconColor}`} /></a>)}</div></div></div>
        <div className="absolute bottom-12 left-1/2 z-40 flex w-[min(92%,1100px)] -translate-x-1/2 flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-white/20 !px-10 !pt-4 font-display text-[0.58rem] text-white/65 max-[640px]:!bottom-2 max-[640px]:!left-4 max-[640px]:!w-[calc(100%-2rem)] max-[640px]:!translate-x-0 max-[640px]:!gap-x-2 max-[640px]:!px-3 max-[640px]:!pt-2 max-[640px]:!text-[0.38rem]"><span>{t('Footer.copyright')}</span><nav className="flex flex-wrap gap-x-4 gap-y-1 max-[640px]:!gap-x-2" aria-label={t('ContactPage.legal')}><Link href="/contact" className="transition hover:text-white">{t('Footer.support')}</Link><Link href="/terms-and-conditions" className="transition hover:text-white">{t('Footer.terms')}</Link><Link href="/privacy-policy" className="transition hover:text-white">{t('Footer.privacy')}</Link></nav></div>
      </div>
    </section>
  );
}
