
'use client';

import { useLocale, useTranslations } from 'next-intl';

import { ContactEntrance } from '@/components/contact/ContactEntrance';
import { ContactFooter } from '@/components/contact/ContactFooter';

export function ContactContent() {
  const t = useTranslations('ContactForm');
  const copy = useTranslations('RevisionCopy');
  const locale = useLocale();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <main
      id="main-content"
      className="contact-single-page min-h-screen w-full"
      dir={direction}
    >
      <section
        className="
          contact-single-section
          relative isolate flex w-full
          min-h-[760px]
          items-center justify-center
          overflow-visible
          px-5 py-20
          sm:px-10 sm:py-24
          lg:px-16 lg:py-28
        "
        aria-labelledby="contact-form-heading"
      >
        {/* Background image */}
        <div
          className="
            pointer-events-none absolute inset-0 z-0
            bg-[url('/assets/images/Group%20109.webp')]
            bg-cover bg-center
            opacity-100
          "
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[rgba(165,7,13,0.2)]"
          aria-hidden="true"
        />

        {/* The form and four existing portfolio photos enter from the center. */}
        <ContactEntrance>
          <div className="contact-entrance__form-wrap">
            {/* Padded glass page heading */}
            <div
              className="contact-entrance__heading"
            >
              <div
                className="contact-entrance__heading-pill"
              >
                <h1
                  id="contact-form-heading"
                  className="
    whitespace-normal text-balance
    font-display
    text-[clamp(0.85rem,2.4vw,1.6rem)]
    font-bold uppercase
    leading-none tracking-[0.04em]
    text-[#710a12]
    [text-shadow:0_2px_8px_rgba(113,10,18,0.25)]
  "
                >
                  {copy('contactHeadline')}
                </h1>
              </div>
            </div>

            {/* Form card */}
            <div
              className="
                contact-form
                relative mx-auto w-full
                max-w-[820px]
                rounded-[24px] sm:rounded-[28px]
                border border-white/25
                bg-[#65070d]
                px-5 pb-8 pt-16
                shadow-[0_28px_90px_rgba(45,0,0,0.35)]
                sm:px-9 sm:pb-10 sm:pt-20
                lg:px-12 lg:pb-12
              "
            >
              <div className="contact-copy mb-8 text-center">
                <p className="contact-copy__eyebrow" lang={locale} dir={direction}>
                  {t('heading')}
                </p>
                <p className="contact-copy__service" lang={locale === 'ar' ? 'ar' : 'en'}>
                  {copy('contactServiceLine')}
                </p>
                <p className="contact-single-section__intro contact-copy__body">
                  {copy('contactCopy')}
                </p>
              </div>

              <form dir={direction}>
                {/* Name + Email */}
                <div
                  className="
                    form-row mb-6
                    grid grid-cols-1 gap-4
                    sm:grid-cols-2
                  "
                >
                  <div className="form-group mb-3 sm:mb-0">
                    <label
                      className="form-label"
                      htmlFor="name"
                    >
                      {t('name')}
                    </label>

                    <input
                      className="form-input"
                      type="text"
                      id="name"
                      name="name"
                      placeholder={t('namePlaceholder')}
                      autoComplete="name"
                      minLength={2}
                      maxLength={120}
                      required
                    />
                  </div>

                  <div className="form-group mb-3 sm:mb-0">
                    <label
                      className="form-label"
                      htmlFor="email"
                    >
                      {t('email')}
                    </label>

                    <input
                      className="form-input"
                      type="email"
                      id="email"
                      name="email"
                      dir="ltr"
                      placeholder={t('emailPlaceholder')}
                      autoComplete="email"
                      maxLength={254}
                      required
                    />
                  </div>
                </div>

                {/* Project */}
                <div className="form-group mb-6">
                  <label
                    className="form-label"
                    htmlFor="building"
                  >
                    {t('project')}
                  </label>

                  <input
                    className="form-input"
                    type="text"
                    id="building"
                    name="building"
                    placeholder={t('projectPlaceholder')}
                    maxLength={200}
                  />
                </div>

                {/* Help */}
                <div className="form-group mb-7">
                  <label
                    className="form-label"
                    htmlFor="help"
                  >
                    {t('helpPrompt')}
                  </label>

                  <select
                    className="form-input form-select"
                    id="help"
                    name="help"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>{copy('helpSelect')}</option>
                    <option value={copy('helpMarketing')}>{copy('helpMarketing')}</option>
                    <option value={copy('helpGraphicDesign')}>{copy('helpGraphicDesign')}</option>
                    <option value={copy('helpCampaign')}>{copy('helpCampaign')}</option>
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="
                    form-submit
                    mt-2 h-12 w-full
                    rounded-full
                    transition-all duration-200
                    hover:brightness-110
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-white
                  "
                >
                  {t('submit')}
                  <span aria-hidden="true"> →</span>
                </button>
              </form>
            </div>
          </div>
        </ContactEntrance>
      </section>

      <ContactFooter />
    </main>
  );
}
