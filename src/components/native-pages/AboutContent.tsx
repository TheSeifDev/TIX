/* eslint-disable */
// @ts-nocheck
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

const insideFramePhotos = [
  { src: '/assets/images/bts1.webp', shape: 'wide' },
  { src: '/assets/images/bts2.webp', shape: 'tall' },
  { src: '/assets/images/bts3.webp', shape: 'square' },
  { src: '/assets/images/bts5.webp', shape: 'square' },
  { src: '/assets/images/bts4.webp', shape: 'tall' },
];

export function AboutContent() {
  const t = useTranslations('AboutPage');
  const locale = useLocale();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const [galleryPaused, setGalleryPaused] = useState(false);
  return (
    <>

  
  
  <main id="main-content">
    <section className="impact-hero" aria-label="Studio hero">
      <div className="container impact-hero__inner">
        <div className="impact-hero__content">
          <h1 className="impact-hero__title" data-reveal="left">{t('title')}</h1>
          <p className="impact-hero__headline" data-reveal="fade">
            {t('heroDescription')}
          </p>
          <div className="impact-hero__proof" data-stagger aria-label={t('specialties')}>
            <span className="proof-card proof-card--1">ALEXANDRIA / EST. 2025</span>
            <span className="proof-card proof-card--2">CREATIVE STUDIO</span>
            <span className="proof-card proof-card--3">MARKETING &amp; PRODUCTION</span>
          </div>
        </div>
      </div>
    </section>

    <section className="brand-focus" aria-label="For brands that need attention">
      <div className="container">
        <p className="brand-focus__line" data-reveal="fade">
          <span>{t('brandNeed')}</span>
          <span className="brand-focus__window" role="img" aria-label="Attention, Impact, Presence, Movement, Culture">
            <span className="brand-focus__track" aria-hidden="true">
              <span className="word-red">ATTENTION</span>
              <span className="word-beige">IMPACT</span>
              <span className="word-red">PRESENCE</span>
              <span className="word-beige">MOVEMENT</span>
              <span className="word-red">ATTENTION</span>
            </span>
          </span>
        </p>
      </div>
    </section>

    
    <section className="signal-intro" id="signal-intro" aria-label={t('signal')}>
      <div className="container signal-intro__inner">
        <div className="signal-intro__left" data-reveal="left">
          <h2 className="signal-intro__title">
            <span>{t('signal')}</span>
          </h2>
          <div className="signal-intro__tagline">
            <p className="signal-intro__tagline-white">{t('storyTagline')}</p>
            <p className="signal-intro__tagline-red">{t('heardTagline')}</p>
          </div>
        </div>

        <div className="signal-intro__right" data-reveal="fade">
          <p className="signal-intro__p">
            {t('signalOne')}
          </p>
          <p className="signal-intro__p">
            {t('signalTwo')}
          </p>
          <p className="signal-intro__p">
            {t('signalThree')}
          </p>
        </div>
      </div>
    </section>

    <section className="touchpoints !relative !h-auto !w-full !bg-black" data-touchpoints aria-label="Built across every touchpoint">
      <div className="touchpoints__stage !relative !inset-auto !mx-0 !w-full !max-w-none !aspect-[1852/2067] !h-auto !overflow-hidden !bg-black">
        <img className="touchpoints__art !absolute !inset-0 !z-[2] !block !h-full !w-full !max-w-none !object-fill !transform-none" src="/assets/images/Group%20109.webp" alt="" aria-hidden="true" />

        <div className="touchpoints__copy !absolute !inset-x-0 !left-0 !right-0 !top-[17%] !z-[6] !mx-auto !w-[53.51%] ![transform:none] !text-center">
          <h2 className="!normal-case !text-[clamp(1.25rem,5.35vw,6rem)] !leading-[0.98]">{t('touchpoints')}</h2>
          <p className="!mx-auto !mt-[1.8%] !w-[89.5%] !max-w-none !text-[clamp(0.72rem,2.6vw,3rem)] !leading-[1.3]">{t('touchpointDescription')}</p>
        </div>

        <img className="touchpoints__logo !absolute !inset-x-0 !top-[60%] !z-[5] !mx-auto !w-[22%] ![transform:translateY(-50%)]" src="/assets/images/logoback.webp" alt="TIX Marketing &amp; Production Agency" />

        <div className="touchpoints__cards" aria-label="Our connected disciplines">
          <img className="touchpoints__card touchpoints__card--1 !absolute !z-[4] !block !h-auto !will-change-transform" src="/assets/images/card1.webp" alt="Strategy: marketing strategy, performance campaigns, social media management, and brand positioning" data-flight-card="0" />
          <img className="touchpoints__card touchpoints__card--2 !absolute !z-[4] !block !h-auto !will-change-transform" src="/assets/images/card2.webp" alt="Production: commercial filming, photography, motion graphics, and event coverage" data-flight-card="1" />
          <img className="touchpoints__card touchpoints__card--3 !absolute !z-[4] !block !h-auto !will-change-transform" src="/assets/images/card3.webp" alt="Digital: UI/UX design, website development, and interactive experiences" data-flight-card="2" />
          <img className="touchpoints__card touchpoints__card--4 !absolute !z-[4] !block !h-auto !will-change-transform" src="/assets/images/card4.webp" alt="Visuals: graphic design, brand systems, creative direction, and packaging" data-flight-card="3" />
        </div>

      </div>
    </section>

    
    <section className="connection" aria-label="Connection">
      <div className="container">
        <div className="connection__inner">
          <div data-reveal="left">
            <p className="connection__label">{t('connection')}</p>
            <h2 className="connection__title">
              {t('connectionTitle')}
            </h2>
            <p className="connection__body">
              {t('connectionBody')}
            </p>
            <div style={{"marginTop": "2rem"}}>
              <a href="/contact" className="btn btn--crimson">{t('startBrand')}</a>
            </div>
          </div>

          <div className="connection__watch" data-reveal="right">
            <img src="/assets/images/mmm.webp" alt="Luxury watch close-up" />
          </div>
        </div>
      </div>
    </section>

    
    <div className="bts__ticker" lang="en" dir="ltr" aria-hidden="true" data-marquee-before-bts>
      <div className="marquee marquee--slow">
        <div className="marquee__track">
          <span className="marquee__item">Frame 024 <span className="marquee__sep">—</span></span>
          <span className="marquee__item">Light Test <span className="marquee__sep">—</span></span>
          <span className="marquee__item">Pre-Production <span className="marquee__sep">—</span></span>
          <span className="marquee__item">On Set <span className="marquee__sep">—</span></span>
          <span className="marquee__item">Raw Signal <span className="marquee__sep">—</span></span>
          <span className="marquee__item">Frame 024 <span className="marquee__sep">—</span></span>
          <span className="marquee__item">Light Test <span className="marquee__sep">—</span></span>
          <span className="marquee__item">Pre-Production <span className="marquee__sep">—</span></span>
          <span className="marquee__item">On Set <span className="marquee__sep">—</span></span>
          <span className="marquee__item">Raw Signal <span className="marquee__sep">—</span></span>
        </div>
      </div>
    </div>

    <section className="bts" aria-label={t('inside')}>
      <div className="container">
        
        <div className="bts__top" data-reveal>
          <p
            style={{"fontFamily": "var(--font-body)", "fontSize": ".8rem", "color": "var(--muted-2)", "letterSpacing": ".06em", "marginBottom": ".3rem"}}>
            {t('btsLead')}</p>
          <h2 className="sec-title sec-title--md">{t('inside')}</h2>
          <p>{t('btsDescription')}</p>
        </div>

        
        <div className="bts__filter" aria-label="Gallery filters" role="list">
          <span className="bts__filter-tag" role="listitem">{t('filters.frame')}</span><span className="bts__filter-tag" role="listitem">{t('filters.light')}</span><span className="bts__filter-tag" role="listitem">{t('filters.pre')}</span><span className="bts__filter-tag" role="listitem">{t('filters.set')}</span><span className="bts__filter-tag" role="listitem">{t('filters.raw')}</span>
        </div>

        <div className="bts__carousel-tools" dir="ltr">
          <button
            type="button"
            className={`bts__motion-toggle${galleryPaused ? ' is-paused' : ''}`}
            dir={direction}
            lang={locale}
            aria-label={galleryPaused ? t('resumeGallery') : t('pauseGallery')}
            onClick={() => setGalleryPaused((paused) => !paused)}
          >
            <span className="bts__motion-toggle-icon" aria-hidden="true">{galleryPaused ? '▶' : 'Ⅱ'}</span>
            <span>{galleryPaused ? t('resumeGallery') : t('pauseGallery')}</span>
          </button>
        </div>

      </div>

      <div className="bts__carousel" role="group" aria-label={t('inside')} tabIndex={0}>
        <div className={`bts__track${galleryPaused ? ' is-paused' : ''}`}>
          <div className="bts__group" role="list">
            {insideFramePhotos.map((photo) => (
              <figure className={`bts__img bts__img--${photo.shape}`} role="listitem" key={photo.src}>
                <img src={photo.src} alt="Studio setup during commercial shoot" loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
          <div className="bts__group bts__group--duplicate" role="presentation" aria-hidden="true">
            {insideFramePhotos.map((photo) => (
              <figure className={`bts__img bts__img--${photo.shape}`} role="presentation" key={`duplicate-${photo.src}`}>
                <img src={photo.src} alt="" loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>

  </main>

  



  

  
  

    </>
  );
}
