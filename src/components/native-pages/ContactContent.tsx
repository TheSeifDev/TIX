/* Native single-section Contact page: one centered inquiry form. */
'use client';

import { ContactFooter } from '@/components/contact/ContactFooter';
import { ContactHero } from '@/components/contact/ContactHero';

export function ContactContent() {
  return (
    <main id="main-content" className="contact-single-page">
      <ContactHero />
      <section className="contact-single-section !relative !min-h-0 !overflow-hidden !bg-[linear-gradient(180deg,#eee1e0_0%,#a96d70_100%)] !px-5 !py-[clamp(3rem,6vw,5rem)] max-[640px]:!h-[240px] max-[640px]:!min-h-0 max-[640px]:!overflow-visible max-[640px]:!p-0 sm:!px-10 lg:!px-16" aria-labelledby="contact-form-heading">
        <div className="contact-single-section__glow" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/assets/images/Group%20109.webp')] bg-cover bg-center opacity-20 mix-blend-multiply max-[640px]:opacity-10" aria-hidden="true" />
        <div className="contact-single-section__inner !w-full max-[640px]:!flex max-[640px]:!h-full max-[640px]:!items-center max-[640px]:!justify-center">
          <p className="contact-single-section__eyebrow max-[640px]:!hidden">TIX / PROJECT INQUIRY</p>
          <div className="contact-form !mx-auto !max-w-[820px] !rounded-[28px] !border-white/25 !bg-[#65070d] !shadow-[0_28px_90px_rgba(45,0,0,0.35)] max-[640px]:!relative max-[640px]:!h-[240px] max-[640px]:!w-[calc(100%-36px)] max-[640px]:!max-w-[342px] max-[640px]:!overflow-visible max-[640px]:!rounded-[20px] max-[640px]:!p-[28px_22px_10px]">
            <h1 id="contact-form-heading" className="contact-form__title max-[640px]:!absolute max-[640px]:!-top-[16px] max-[640px]:!left-1/2 max-[640px]:!z-10 max-[640px]:!m-0 max-[640px]:!-translate-x-1/2 max-[640px]:!whitespace-nowrap max-[640px]:!text-[0.9rem] max-[640px]:!tracking-[0.06em] max-[640px]:![text-shadow:1px_1px_0_#65070d,-1px_-1px_0_#65070d,1px_-1px_0_#65070d,-1px_1px_0_#65070d]">LET'S GET IN TOUCH</h1>
            <p className="contact-single-section__intro max-[640px]:!hidden">
              Tell us what you are building. We will take it from there.
            </p>
            <form noValidate>
              <div className="form-row max-[640px]:!mb-[11px] max-[640px]:!grid max-[640px]:!grid-cols-2 max-[640px]:!gap-2">
              <div className="form-group max-[640px]:!mb-1">
                <label className="form-label max-[640px]:!text-[0.55rem]" htmlFor="name">Your name</label>
                <input className="form-input max-[640px]:!h-[21px] max-[640px]:!min-h-0 max-[640px]:!rounded-full max-[640px]:!px-2 max-[640px]:!py-1 max-[640px]:!text-[0.52rem]" type="text" id="name" name="name" placeholder="Ahmed Hassan" autoComplete="name" minLength={2} maxLength={120} required />
                </div>
                <div className="form-group max-[640px]:!mb-1">
                  <label className="form-label max-[640px]:!text-[0.55rem]" htmlFor="email">Email</label>
                  <input className="form-input max-[640px]:!h-[21px] max-[640px]:!min-h-0 max-[640px]:!rounded-full max-[640px]:!px-2 max-[640px]:!py-1 max-[640px]:!text-[0.52rem]" type="email" id="email" name="email" placeholder="you@brand.com" autoComplete="email" maxLength={254} required />
                </div>
              </div>
              <div className="form-group max-[640px]:!mb-[11px]">
                <label className="form-label max-[640px]:!text-[0.55rem]" htmlFor="building">What are you building?</label>
                <input className="form-input max-[640px]:!h-[21px] max-[640px]:!min-h-0 max-[640px]:!rounded-full max-[640px]:!px-2 max-[640px]:!py-1 max-[640px]:!text-[0.52rem]" type="text" id="building" name="building" placeholder="A campaign, a launch, a brand, a digital experience…" maxLength={200} />
              </div>
              <div className="form-group max-[640px]:!mb-[22px]">
                <label className="form-label max-[640px]:!text-[0.55rem]" htmlFor="help">What do you need help with?</label>
                <textarea className="form-textarea max-[640px]:!h-[22px] max-[640px]:!min-h-0 max-[640px]:!resize-none max-[640px]:!rounded-full max-[640px]:!px-2 max-[640px]:!py-1 max-[640px]:!text-[0.52rem]" id="help" name="help" placeholder="Tell us about your brand, your goals, your timeline…" rows={4} minLength={10} maxLength={5000} required />
              </div>
              <button type="submit" className="form-submit max-[640px]:!mt-1 max-[640px]:!h-[27px] max-[640px]:!rounded-full max-[640px]:!py-0 max-[640px]:!text-[0.62rem]">Start The Project <span aria-hidden="true">→</span></button>
            </form>
          </div>
        </div>
      </section>
      <ContactFooter />
    </main>
  );
}
