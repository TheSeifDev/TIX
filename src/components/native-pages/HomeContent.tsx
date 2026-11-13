/* eslint-disable */
// @ts-nocheck
'use client';

import { useTranslations } from 'next-intl';

export function HomeContent() {
  const t = useTranslations('HomePage');
  const items = useTranslations('HomeLists');
  return (
    <>

  


  <main id="main-content">

    <section className="hero" aria-label="Hero introduction">

      
      <div className="hero__bg" aria-hidden="true">
        <img src="assets/images/HERO.webp" alt="" className="hero__bg-img" width="1920" height="1080" loading="eager"
          fetchPriority="high" />
        <div className="hero__bg-overlay"></div>
      </div>

      <div className="hero__grid-pattern" aria-hidden="true"></div>

      <div className="hero__inner">
        <div className="hero__content container">

          
          <div className="hero__logo-wrap">
            <img src="assets/images/tixx.webp" alt="TIX Creative Agency" className="hero__logo-img" />
          </div>

          <h2 className="hero__headline-light">{t('heroLight')}</h2>
          <h2 className="hero__headline-bold">{t('heroBold')}</h2>

          <p className="hero__desc">{t('heroDescription')}</p>

          
          <div className="hero__stats-row">
            <div className="hero__stat-pill">{t('activeCampaigns')}</div>
            <div className="hero__stat-pill">{t('globalClients')}</div>
            <div className="hero__stat-pill">{t('projectsDelivered')}</div>
          </div>

          
          <div className="hero__actions">
            <a href="/about" className="btn btn--crimson btn--lg">
              {t('enterStudio')}
            </a>
          </div>

        </div>
      </div>


    </section>



    

  
  <section className="tix-frame-section observer-target">
    
    
    <div className="tix-tab-header-wrapper">
      <div className="tix-frame-tab">
        <h2>{t('explore')}</h2>
      </div>
    </div>

    
    <div className="tix-drape-bg">
      <div className="tix-strategy-headers">
        <span>{t('brandDirection')}</span>
        <span>{t('visualStrategy')}</span>
        <span>{t('audienceImpact')}</span>
      </div>

      <div className="tix-cards-container">
        
        <div className="tix-oval-card tix-card-edge delay-3 observer-target">
          <img src="assets/images/events.webp" alt={t('events')} />
          <span className="tix-card-label">{t('events')}</span>
        </div>

        
        <div className="tix-oval-card tix-card-mid delay-2 observer-target">
          <img src="assets/images/Perfumes.webp" alt={t('perfumes')} />
          <span className="tix-card-label">{t('perfumes')}</span>
        </div>

        
        <div className="tix-oval-card tix-card-center delay-1 observer-target">
          <img src="assets/images/fashion-jpg.webp" alt={t('fashion')} />
          <span className="tix-card-label">{t('fashion')}</span>
        </div>

        
        <div className="tix-oval-card tix-card-mid delay-2 observer-target">
          <img src="assets/images/jewelry.webp" alt={t('jewelry')} />
          <span className="tix-card-label">{t('jewelry')}</span>
        </div>

        
        <div className="tix-oval-card tix-card-edge delay-3 observer-target">
          <img src="assets/images/food.webp" alt={t('food')} />
          <span className="tix-card-label">{t('food')}</span>
        </div>
      </div>
    </div>

  </section>


    
    <section className="disrupt !bg-transparent" data-disrupt-pin aria-label="Studio services">
      <div className="disrupt__sticky isolate relative flex h-[100dvh] w-full items-stretch justify-center !overflow-visible !bg-transparent px-[clamp(0.75rem,2.5vw,2.5%)]">

        
        <div className="disrupt__bg" aria-hidden="true">
          <div className="disrupt__grad-wrap">
            <img src="assets/images/grad.webp" alt="" className="disrupt__grad !mix-blend-lighten" width="1920" height="1080" loading="lazy" />
          </div>
        </div>

        
        <div className="disrupt__tix !-top-[clamp(5rem,10vh,7rem)] !z-[3] !w-[clamp(220px,30vw,360px)] max-lg:!-top-[clamp(4rem,8vh,5rem)] max-lg:!w-[min(44vw,220px)]" aria-hidden="true">
          <img src="assets/images/tixx.webp" alt="" className="disrupt__tix-img !filter-none" width="800" height="320" loading="lazy" />
        </div>

        
        <div className="disrupt__left isolate !z-[3]">
          <h2 className="disrupt__tagline whitespace-pre-line !z-[0] !-top-[clamp(10rem,28vh,16rem)] max-lg:!-top-[clamp(4rem,10vh,7rem)]">
            {t('disrupt')}
          </h2>
          <img src="assets/images/modelcrop.webp" alt="TIX creative campaign model" className="disrupt__girl !bottom-[clamp(3rem,8vh,6rem)] !z-[10] !mix-blend-normal max-lg:!bottom-[clamp(2rem,6vh,4rem)]"
            width="720" height="960" loading="lazy" />
        </div>

        
        <div className="disrupt__right !z-[4]">
          <div className="disrupt__viewport">
            <div className="disrupt__track" data-disrupt-track>

              <article className="disrupt__card !h-[clamp(560px,72vh,760px)] !rounded-tl-none !rounded-tr-[52px] !rounded-br-none !rounded-bl-[52px] max-lg:!h-[clamp(520px,68vh,680px)] max-lg:!rounded-tr-[34px] max-lg:!rounded-bl-[34px]">
                <span className="disrupt__num">01</span>
                <h3 className="disrupt__card-title">{t('marketing')}</h3>
                <p className="disrupt__card-desc">{t('marketingDescription')}</p>
                <ul className="disrupt__list !gap-0">
                  <li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('marketing1')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('marketing2')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('marketing3')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('marketing4')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('marketing5')}</li>
                </ul>
              </article>

              <article className="disrupt__card !h-[clamp(560px,72vh,760px)] !rounded-tl-none !rounded-tr-[52px] !rounded-br-none !rounded-bl-[52px] max-lg:!h-[clamp(520px,68vh,680px)] max-lg:!rounded-tr-[34px] max-lg:!rounded-bl-[34px]">
                <span className="disrupt__num">02</span>
                <h3 className="disrupt__card-title">{t('socialMedia')}</h3>
                <p className="disrupt__card-desc">{t('socialDescription')}</p>
                <ul className="disrupt__list !gap-0">
                  <li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('social1')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('social2')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('social3')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('social4')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('social5')}</li>
                </ul>
              </article>

              <article className="disrupt__card !h-[clamp(560px,72vh,760px)] !rounded-tl-none !rounded-tr-[52px] !rounded-br-none !rounded-bl-[52px] max-lg:!h-[clamp(520px,68vh,680px)] max-lg:!rounded-tr-[34px] max-lg:!rounded-bl-[34px]">
                <span className="disrupt__num">03</span>
                <h3 className="disrupt__card-title">{t('production')}</h3>
                <p className="disrupt__card-desc">{t('productionDescription')}</p>
                <ul className="disrupt__list !gap-0">
                  <li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('production1')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('production2')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('production3')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('production4')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('production5')}</li>
                </ul>
              </article>

              <article className="disrupt__card !h-[clamp(560px,72vh,760px)] !rounded-tl-none !rounded-tr-[52px] !rounded-br-none !rounded-bl-[52px] max-lg:!h-[clamp(520px,68vh,680px)] max-lg:!rounded-tr-[34px] max-lg:!rounded-bl-[34px]">
                <span className="disrupt__num">04</span>
                <h3 className="disrupt__card-title">{t('graphicDesign')}</h3>
                <p className="disrupt__card-desc">{t('designDescription')}</p>
                <ul className="disrupt__list !gap-0">
                  <li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('design1')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('design2')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('design3')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('design4')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('design5')}</li>
                </ul>
              </article>

              <article className="disrupt__card !h-[clamp(560px,72vh,760px)] !rounded-tl-none !rounded-tr-[52px] !rounded-br-none !rounded-bl-[52px] max-lg:!h-[clamp(520px,68vh,680px)] max-lg:!rounded-tr-[34px] max-lg:!rounded-bl-[34px]">
                <span className="disrupt__num">05</span>
                <h3 className="disrupt__card-title">{t('webDevelopment')}</h3>
                <p className="disrupt__card-desc">{t('webDescription')}</p>
                <ul className="disrupt__list !gap-0">
                  <li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('web1')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('web2')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('web3')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('web4')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('web5')}</li>
                </ul>
              </article>

              <article className="disrupt__card !h-[clamp(560px,72vh,760px)] !rounded-tl-none !rounded-tr-[52px] !rounded-br-none !rounded-bl-[52px] max-lg:!h-[clamp(520px,68vh,680px)] max-lg:!rounded-tr-[34px] max-lg:!rounded-bl-[34px]">
                <span className="disrupt__num">06</span>
                <h3 className="disrupt__card-title">{t('uiux')}</h3>
                <p className="disrupt__card-desc">{t('uiuxDescription')}</p>
                <ul className="disrupt__list !gap-0">
                  <li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('ui1')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('ui2')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('ui3')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('ui4')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('ui5')}</li>
                </ul>
              </article>

            </div>
          </div>
        </div>

        
        <div className="disrupt__outro" data-disrupt-outro aria-hidden="true">
          <article className="disrupt__tile">
            <img src="assets/images/jw.webp" alt="" className="disrupt__tile-img" width="400" height="520" loading="lazy" />
            <div className="disrupt__tile-copy">
              <h3 className="disrupt__tile-title">{t('strategyTile')}</h3>
              <p className="disrupt__tile-sub">{t('strategyTileDescription')}</p>
            </div>
          </article>
          <article className="disrupt__tile">
            <img src="assets/images/fashion-png.webp" alt="" className="disrupt__tile-img" width="400" height="520" loading="lazy" />
            <div className="disrupt__tile-copy">
              <h3 className="disrupt__tile-title">{t('mediaTile')}</h3>
              <p className="disrupt__tile-sub">{t('mediaTileDescription')}</p>
            </div>
          </article>
          <article className="disrupt__tile">
            <img src="assets/images/j2.webp" alt="" className="disrupt__tile-img" width="400" height="520" loading="lazy" />
            <div className="disrupt__tile-copy">
              <h3 className="disrupt__tile-title">{t('marketingTile')}</h3>
              <p className="disrupt__tile-sub">{t('marketingTileDescription')}</p>
            </div>
          </article>
          <article className="disrupt__tile">
            <img src="assets/images/fashion1.webp" alt="" className="disrupt__tile-img" width="400" height="520" loading="lazy" />
            <div className="disrupt__tile-copy">
              <h3 className="disrupt__tile-title">{t('digitalTile')}</h3>
              <p className="disrupt__tile-sub">{t('digitalTileDescription')}</p>
            </div>
          </article>
        </div>

        
        <div className="disrupt__cloud" aria-hidden="true"></div>
      </div>
    </section>


    
    <section className="trust-section" aria-labelledby="trust-heading">
      <div className="trust-section__inner">
        <div className="trust-section__ribbon trust-section__ribbon--light marquee" aria-hidden="true">
          <div className="marquee__track">
            <span className="marquee__item">TIX <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">CREATIVE DIRECTION <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">STRATEGY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">PRODUCTION <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">DIGITAL EXPERIENCE <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">LUXURY CAMPAIGNS <span className="marquee__sep">✦</span></span>
          </div>
        </div>

        <div className="trust-section__ribbon trust-section__ribbon--crimson marquee marquee--reverse" aria-hidden="true">
          <div className="marquee__track">
            <span className="marquee__item">ZEN DIAMOND <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">KENZ GOLD <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">ALMASAT ELKHALIJ <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">GAWHARA <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">LUGANO <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">ZARA <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">H&amp;M <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">LOCATION CAFE <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">SWEET DOOR <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">MAAMOL <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">DR IDOL <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">FUNDIK <span className="marquee__sep">✦</span></span>
          </div>
        </div>

        <h2 className="trust-section__headline" id="trust-heading">
          <span className="trust-section__word trust-section__word--they">{t('they')}</span>
          <span className="trust-section__word trust-section__word--trusted">{t('trusted')}</span>
          <span className="trust-section__word trust-section__word--us">{t('us')}</span>
        </h2>

        <div className="trust-section__cta">
          <a href="/work" className="btn btn--outline">{t('seeWork')}</a>
        </div>
      </div>
    </section>

  </main>

  
  

  
  
  

    </>
  );
}
