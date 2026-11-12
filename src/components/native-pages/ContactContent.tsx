/* Native single-section Contact page: one centered inquiry form. */
'use client';

import { ContactFooter } from '@/components/contact/ContactFooter';
import { ContactHero } from '@/components/contact/ContactHero';

export function ContactContent() {
  return (
    <main id="main-content" className="contact-single-page">
      <ContactHero />
      <section className="contact-single-section !relative !min-h-0 !overflow-hidden !bg-[#eee1e0] !px-5 !py-[clamp(3rem,7vw,6rem)] sm:!px-10 lg:!px-16" aria-labelledby="contact-form-heading">
        <div className="contact-single-section__glow" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/assets/images/Group%20109.webp')] bg-cover bg-center opacity-20 mix-blend-multiply" aria-hidden="true" />
        <div className="contact-single-section__inner">
          <p className="contact-single-section__eyebrow">TIX / PROJECT INQUIRY</p>
          <div className="contact-form !mx-auto !max-w-[820px] !rounded-[28px] !border-white/25 !bg-[#65070d] !shadow-[0_28px_90px_rgba(45,0,0,0.35)]">
            <h1 id="contact-form-heading" className="contact-form__title">LET'S GET IN TOUCH</h1>
            <p className="contact-single-section__intro">
              Tell us what you are building. We will take it from there.
            </p>
            <form noValidate>
              <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your name</label>
                <input className="form-input" type="text" id="name" name="name" placeholder="Ahmed Hassan" autoComplete="name" minLength={2} maxLength={120} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input className="form-input" type="email" id="email" name="email" placeholder="you@brand.com" autoComplete="email" maxLength={254} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="building">What are you building?</label>
                <input className="form-input" type="text" id="building" name="building" placeholder="A campaign, a launch, a brand, a digital experience…" maxLength={200} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="help">What do you need help with?</label>
                <textarea className="form-textarea" id="help" name="help" placeholder="Tell us about your brand, your goals, your timeline…" rows={4} minLength={10} maxLength={5000} required />
              </div>
              <button type="submit" className="form-submit">Start The Project <span aria-hidden="true">→</span></button>
            </form>
          </div>
        </div>
      </section>
      <ContactFooter />
    </main>
  );
}
