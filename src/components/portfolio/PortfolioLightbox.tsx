'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type GalleryImage = { src: string; alt: string };

export function PortfolioLightbox() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [index, setIndex] = useState(0);
  const [previousFocus, setPreviousFocus] = useState<HTMLElement | null>(null);
  const open = images.length > 0;
  useEffect(() => {
    const onCardClick = (event: Event) => {
      const card = (event.target as HTMLElement).closest<HTMLButtonElement>('.wg-card');
      if (!card) return;
      const category = card.closest<HTMLElement>('.wg-cat');
      const found = [...(category?.querySelectorAll<HTMLImageElement>('.wg-panel img') ?? [])].map(image => ({ src: new URL(image.getAttribute('src') ?? image.src, window.location.href).pathname, alt: image.alt }));
      if (!found.length) return;
      setPreviousFocus(document.activeElement as HTMLElement);
      setImages(found); setIndex(0);
    };
    document.addEventListener('click', onCardClick);
    return () => document.removeEventListener('click', onCardClick);
  }, []);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setImages([]); if (event.key === 'ArrowRight') setIndex(value => (value + 1) % images.length); if (event.key === 'ArrowLeft') setIndex(value => (value - 1 + images.length) % images.length); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); previousFocus?.focus(); };
  }, [open, images.length, previousFocus]);
  if (!open) return null;
  const current = images[index];
  return <div className="tix-portfolio-lightbox" role="dialog" aria-modal="true" aria-label="Portfolio gallery">
    <button className="tix-portfolio-lightbox__backdrop" aria-label="Close gallery" onClick={() => setImages([])} />
    <div className="tix-portfolio-lightbox__content">
      <button className="tix-portfolio-lightbox__close" type="button" aria-label="Close gallery" onClick={() => setImages([])}>×</button>
      <button className="tix-portfolio-lightbox__previous" type="button" aria-label="Previous image" onClick={() => setIndex(value => (value - 1 + images.length) % images.length)}>‹</button>
      <Image src={current.src} alt={current.alt} className="tix-portfolio-lightbox__image" width={1600} height={1600} sizes="(max-width: 900px) 80vw, 900px" unoptimized />
      <button className="tix-portfolio-lightbox__next" type="button" aria-label="Next image" onClick={() => setIndex(value => (value + 1) % images.length)}>›</button>
      <p className="tix-portfolio-lightbox__counter">{index + 1} / {images.length}</p>
    </div>
  </div>;
}
