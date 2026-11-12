# Route cleanup and Services reconstruction

The public canonical routes are now `/`, `/ar`, `/about`, `/services`, `/work`, and `/contact`. The previous `.html` routes remain compatibility redirects in `next.config.ts`, preserving old bookmarks and search-engine entry points.

The Services reconstruction follows the archived `ServicesHero` behavior: chevrons open once after a 450ms entrance delay, the basket receives bounded pointer tilt on fine pointers, and the Creativity Calls composition enters on scroll with an elastic phone timeline. All event listeners are registered through the React effect cleanup path; GSAP timelines and ScrollTriggers are scoped through `useGSAP`.

Work gallery expansion is width-only. GSAP changes card flex-basis on pointer hover or keyboard focus and restores equal widths on pointer/focus leave. No scale transform is used for the expansion interaction, and the existing card height remains unchanged.
