'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import { PortfolioLightbox } from '@/components/portfolio/PortfolioLightbox';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function PageInteractions({ page }: { page: 'home' | 'about' | 'services' | 'work' | 'contact' }) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.utils.toArray<HTMLElement>('[data-reveal], .observer-target').forEach((target) => {
      gsap.fromTo(target, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: target, start: 'top 86%', once: true } });
    });
    if (page === 'home') {
      const hero = document.querySelector('.hero__content');
      if (hero) gsap.fromTo(hero, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' });
    }
    const disrupt = document.querySelector<HTMLElement>('[data-disrupt-pin]');
    const disruptSticky = disrupt?.querySelector<HTMLElement>('.disrupt__sticky');
    const disruptTrack = disrupt?.querySelector<HTMLElement>('[data-disrupt-track]');
    const disruptViewport = disrupt?.querySelector<HTMLElement>('.disrupt__viewport');
    if (disrupt && disruptSticky && disruptTrack && disruptViewport) {
      const getTravel = () => Math.max(0, disruptTrack.scrollHeight - disruptViewport.clientHeight);
      ScrollTrigger.create({ trigger: disrupt, start: 'top top', end: () => `+=${Math.ceil(getTravel() * 1.28)}`, pin: disruptSticky, scrub: true, invalidateOnRefresh: true, onUpdate: self => { disruptTrack.style.transform = `translate3d(0, ${(-self.progress * getTravel()).toFixed(1)}px, 0)`; } });
    }
    const lens = document.querySelector<HTMLElement>('[data-work-lens]');
    const lensSticky = lens?.querySelector<HTMLElement>('.work-lens__sticky');
    const lensTrack = lens?.querySelector<HTMLElement>('[data-work-lens-track]');
    const lensWrapper = lens?.querySelector<HTMLElement>('.image-grid-wrapper');
    if (lens && lensSticky && lensTrack && lensWrapper) {
      const getTravel = () => Math.max(0, lensTrack.scrollWidth - lensWrapper.clientWidth);
      ScrollTrigger.create({ trigger: lens, start: 'top top', end: () => `+=${Math.ceil(getTravel())}`, pin: lensSticky, scrub: true, invalidateOnRefresh: true, onUpdate: self => { lensTrack.style.transform = `translate3d(${(-self.progress * getTravel()).toFixed(1)}px, 0, 0)`; } });
    }
  }, { dependencies: [page], revertOnUpdate: true });

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const on = <T extends EventTarget>(target: T | null, type: string, listener: EventListenerOrEventListenerObject) => { if (target) { target.addEventListener(type, listener); cleanups.push(() => target.removeEventListener(type, listener)); } };
    const form = document.querySelector<HTMLFormElement>('.contact-form form');
    if (form) {
      const submit = async (event: Event) => {
        event.preventDefault();
        const submitter = form.querySelector<HTMLButtonElement>('.form-submit');
        if (!submitter || submitter.disabled) return;
        const oldLabel = submitter.textContent;
        submitter.disabled = true; submitter.textContent = 'Sending…';
        let status = form.querySelector<HTMLElement>('.form-status');
        if (!status) { status = document.createElement('p'); status.className = 'form-status'; status.setAttribute('role', 'status'); form.append(status); }
        try {
          const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
          const body = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(body.error || 'Unable to send your message.');
          status.textContent = 'Message sent. We will be in touch soon.'; form.reset();
        } catch (error) { status.textContent = error instanceof Error ? error.message : 'Unable to send your message.'; }
        submitter.disabled = false; submitter.textContent = oldLabel;
      };
      const trap = document.createElement('input'); trap.name = 'company'; trap.tabIndex = -1; trap.setAttribute('autocomplete', 'off'); trap.setAttribute('aria-hidden', 'true'); trap.style.cssText = 'position:absolute;left:-10000px'; form.append(trap);
      on(form, 'submit', submit);
      cleanups.push(() => trap.remove());
    }
    if (page === 'work') {
      const gallery = document.querySelector('.work-gallery');
      const filterButton = gallery?.querySelector<HTMLButtonElement>('#work-filter-btn');
      const filterMenu = gallery?.querySelector<HTMLElement>('#work-filter-menu');
      const closeFilter = () => { filterButton?.classList.remove('is-open'); filterButton?.setAttribute('aria-expanded', 'false'); filterMenu?.classList.remove('is-open'); filterMenu?.setAttribute('hidden', ''); };
      const toggleFilter = () => { const next = !filterButton?.classList.contains('is-open'); filterButton?.classList.toggle('is-open', next); filterButton?.setAttribute('aria-expanded', String(next)); filterMenu?.classList.toggle('is-open', next); if (next) filterMenu?.removeAttribute('hidden'); else filterMenu?.setAttribute('hidden', ''); };
      if (filterButton) on(filterButton, 'click', toggleFilter);
      filterMenu?.querySelectorAll<HTMLElement>('[data-jump]').forEach(link => on(link, 'click', (event) => { event.preventDefault(); const key = link.dataset.jump; const category = gallery?.querySelector<HTMLElement>(`.wg-cat[data-category="${key}"]`); closeFilter(); category?.classList.add('is-open'); category?.querySelector<HTMLElement>('.wg-panel')?.removeAttribute('hidden'); category?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
      gallery?.querySelectorAll<HTMLElement>('.wg-cat').forEach(category => {
        const panel = category.querySelector<HTMLElement>('.wg-panel');
        const toggle = () => { const open = !category.classList.contains('is-open'); category.classList.toggle('is-open', open); if (panel) { if (open) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', ''); } };
        category.querySelectorAll<HTMLElement>('.wg-arrow--second, .wg-cat__name').forEach(control => on(control, 'click', toggle));
      });
      on(document, 'click', (event) => { if (filterButton && filterMenu && !filterButton.contains(event.target as Node) && !filterMenu.contains(event.target as Node)) closeFilter(); });
      on(document, 'keydown', (event) => { if ((event as KeyboardEvent).key === 'Escape') closeFilter(); });
    }
    if (page === 'services') {
      const stage = document.querySelector<HTMLElement>('.svchero__stage');
      if (stage) on(stage, 'click', () => stage.classList.toggle('is-open'));
    }
    return () => cleanups.forEach(cleanup => cleanup());
  }, [page]);
  return page === 'work' ? <PortfolioLightbox /> : null;
}
