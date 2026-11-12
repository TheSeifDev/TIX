/* eslint-disable */
// @ts-nocheck
'use client';

export function ContactContent() {
  return (
    <>

  

  
  <main id="main-content">
    <section className="contact-hero">

      <div className="contact-orb"></div>

      <div className="container contact-hero__inner">

        <img src="../assets/images/tixx.webp" alt="TIX" className="contact-hero__logo" />

        <h1 className="contact-hero__title">
          LET'S CREATE
          <span className="next">THE NEXT</span>
          BIG THING
        </h1>

        <p className="contact-hero__tagline">
          Strategy. Production. Marketing.
          Experiences that people remember.
        </p>

      </div>

    </section>


    
    <section className="contact-form-section" aria-label="Contact form">
      <div className="container">
        <div className="contact-form-section__inner">

          
          <div data-reveal="left">


            <h2 className="sec-title sec-title--md" style={{"marginBottom": ".8rem"}}>Let's make something<br /><em
                style={{"fontFamily": "var(--font-editorial)", "fontStyle": "italic", "color": "var(--crimson-bright)"}}>impossible to
                ignore.</em></h2>
            <p className="sec-body" style={{"marginBottom": "2rem"}}>From the first strategic idea to the final frame — we partner
              with brands that are serious about their signal.</p>

            
            <div style={{"display": "flex", "flexDirection": "column", "gap": ".5rem"}}>
              <div style={{"display": "flex", "alignItems": "center", "gap": ".75rem", "fontSize": ".85rem", "color": "var(--muted)"}}>
                <span style={{"width": "20px", "height": "1px", "background": "var(--crimson-bright)", "flexShrink": "0"}}></span>
                Brand Strategy &amp; Direction
              </div>
              <div style={{"display": "flex", "alignItems": "center", "gap": ".75rem", "fontSize": ".85rem", "color": "var(--muted)"}}>
                <span style={{"width": "20px", "height": "1px", "background": "var(--crimson-bright)", "flexShrink": "0"}}></span>
                Commercial &amp; Editorial Production
              </div>
              <div style={{"display": "flex", "alignItems": "center", "gap": ".75rem", "fontSize": ".85rem", "color": "var(--muted)"}}>
                <span style={{"width": "20px", "height": "1px", "background": "var(--crimson-bright)", "flexShrink": "0"}}></span>
                Digital Experiences &amp; UI Design
              </div>
              <div style={{"display": "flex", "alignItems": "center", "gap": ".75rem", "fontSize": ".85rem", "color": "var(--muted)"}}>
                <span style={{"width": "20px", "height": "1px", "background": "var(--crimson-bright)", "flexShrink": "0"}}></span>
                Visual Identity Systems
              </div>
            </div>
          </div>

          
          <div data-reveal="right">
            <div className="contact-form">
              <h2 className="contact-form__title">LET'S GET IN TOUCH</h2>
              <form noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Your name</label>
                    <input className="form-input" type="text" id="name" name="name" placeholder="Ahmed Hassan"
                      autoComplete="name" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-input" type="email" id="email" name="email" placeholder="you@brand.com"
                      autoComplete="email" required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="building">What are you building?</label>
                  <input className="form-input" type="text" id="building" name="building"
                    placeholder="A campaign, a launch, a visual identity, a digital experience…" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="help">What do you need help with?</label>
                  <textarea className="form-textarea" id="help" name="help"
                    placeholder="Tell us about your brand, your goals, your timeline…" rows="4"></textarea>
                </div>

                <button type="submit" className="form-submit">
                  Start The Project →
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>

    
    <section className="contact-footer-section" aria-label="Contact information">
      <div className="container">

        
        <div className="contact-footer__hero-text">
          <h2 className="contact-footer__headline" data-reveal>
            Let's make something,
            <em>impossible to ignore.</em>
          </h2>

          <div className="contact-footer__person" aria-hidden="true">
            <img src="../assets/images/tixlogo.webp" alt="" />
          </div>
        </div>

        
        <div className="contact-footer__info" data-stagger>

          
          <div>
            <div className="contact-info-block" style={{"marginBottom": "2rem"}}>
              <h3>Email</h3>
              <a href="mailto:tix@gmail.com" className="contact-email-pill">TIX@GMAIL.COM</a>
            </div>

            <div className="contact-info-block">
              <h3>Our Branches</h3>
              <div className="contact-branches">
                <span className="contact-branch-pill">Alexandria, Elraml Station</span>
                <span className="contact-branch-pill">Agami, Elbetash</span>
              </div>
            </div>
          </div>

          
          <div>
            <div className="contact-info-block">
              <h3>Follow Us</h3>
              <div className="contact-socials">

                
                <a href="https://www.instagram.com/ajz_photographer?igsh=MXc1bDJ1aGNvOWFnZA==" className="social-icon" aria-label="TIX on Instagram"
                  rel="noopener noreferrer" target="_blank">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                    strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
                  </svg>
                </a>

                
                <a href="https://www.facebook.com/" className="social-icon" aria-label="TIX on Facebook"
                  rel="noopener noreferrer" target="_blank">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>

                
                <a href="https://www.linkedin.com/" className="social-icon" aria-label="TIX on LinkedIn"
                  rel="noopener noreferrer" target="_blank">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                
                <a href="https://www.whatsapp.com/" className="social-icon" aria-label="TIX on WhatsApp"
                  rel="noopener noreferrer" target="_blank">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path
                      d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </a>

                
                <a href="https://www.tiktok.com/" className="social-icon" aria-label="TIX on TikTok"
                  rel="noopener noreferrer" target="_blank">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path
                      d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
                  </svg>
                </a>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

  </main>

  

  
  

    </>
  );
}
