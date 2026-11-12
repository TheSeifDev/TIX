/* Native single-section Contact page: one centered inquiry form. */
'use client';

export function ContactContent() {
  return (
    <main id="main-content" className="contact-single-page">
      <section className="contact-single-section" aria-labelledby="contact-form-heading">
        <div className="contact-single-section__glow" aria-hidden="true" />
        <div className="contact-single-section__inner">
          <p className="contact-single-section__eyebrow">TIX / PROJECT INQUIRY</p>
          <div className="contact-form">
            <h1 id="contact-form-heading" className="contact-form__title">LET'S GET IN TOUCH</h1>
            <p className="contact-single-section__intro">
              Tell us what you are building. We will take it from there.
            </p>
            <form noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your name</label>
                  <input className="form-input" type="text" id="name" name="name" placeholder="Your name" autoComplete="name" minLength={2} maxLength={120} required />
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
                <label className="form-label" htmlFor="help">Tell us about the project</label>
                <textarea className="form-textarea" id="help" name="help" placeholder="Your goals, scope, and expected timeline…" rows={5} minLength={10} maxLength={5000} required />
              </div>
              <button type="submit" className="form-submit">Start the project <span aria-hidden="true">→</span></button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
