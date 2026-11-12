# Animation inventory

| Behavior | Original implementation | Native migration | Status |
|---|---|---|---|
| Reveal-on-scroll | IntersectionObserver + `.show` classes | `PageInteractions` + GSAP `ScrollTrigger`, scoped per target | Implemented; multi-viewport verification pending |
| Hero entrance | CSS/legacy `HeroAnim` | GSAP entrance on `.hero__content` | Implemented |
| Parallax and cursor | `main.js` global modules | Not yet fully extracted into hook modules | In progress |
| Disrupt pinned sequence | `DisruptPin` requestAnimationFrame | Native GSAP pin/scrub extraction pending | In progress |
| WorkLens horizontal scroll | `WorkLens` requestAnimationFrame | Native GSAP extraction pending | In progress |
| Portfolio overlay/lightbox | Legacy global module | React interaction extraction pending | In progress |
| Services basket/folders | Legacy event/observer modules | React event boundary started | In progress |
| Marquees | CSS/legacy marquee behavior | Existing CSS retained | Preserved |

The original source contains no GSAP import or ScrollTrigger integration. The migration is therefore a behavior refactor from custom DOM/observer code into scoped React/GSAP effects, not an upgrade of an existing GSAP implementation.
