import Image from 'next/image';

export function HomeBrandsSection() {
  return (
    <section className="home-brands" data-home-brands aria-labelledby="home-brands-title">
      <div className="home-brands__inner">
        <header className="home-brands__heading" lang="en" dir="ltr">
          <p className="home-brands__eyebrow">BRAND SPOTLIGHT</p>
          <h2 id="home-brands-title">ZEN DIAMOND</h2>
        </header>

        <div className="home-brands__collage">
          <figure className="home-brands__photo home-brands__photo--large" data-brand-photo="large">
            <Image
              src="/assets/images/zen-diamond-necklace.webp"
              alt="ZEN Diamond necklace displayed on a dark velvet stand."
              width={4096}
              height={3280}
              sizes="(max-width: 640px) 60vw, 42vw"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="home-brands__photo home-brands__photo--upper" data-brand-photo="upper-right">
            <Image
              src="/assets/images/zen-diamond-bracelet.webp"
              alt="ZEN Diamond bracelet displayed across dark velvet cases."
              width={4096}
              height={3280}
              sizes="(max-width: 640px) 38vw, 30vw"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="home-brands__photo home-brands__photo--lower" data-brand-photo="lower-left">
            <Image
              src="/assets/images/zen-diamond-jewelry-set.webp"
              alt="ZEN Diamond earrings, ring, and bracelet arranged on dark velvet displays."
              width={4096}
              height={3280}
              sizes="(max-width: 640px) 40vw, 30vw"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
