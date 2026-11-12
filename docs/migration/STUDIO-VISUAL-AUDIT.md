# Studio Visual Audit

## Scope

Audit of the native `/about` route against the supplied Studio reference and the archived `legacy-pages/about.html` implementation.

## Section inventory

| Order | Section | React source | Assets | Finding |
|---|---|---|---|---|
| 1 | Impact hero | `AboutContent.tsx` / `.impact-hero` | typography, proof pills | Present, but reveal state could leave the complete hero invisible. |
| 2 | Brand focus | `.brand-focus` | CSS word-roll | Present and structurally correct. |
| 3 | The Signal | `#signal-intro` | text content | Present; copy was hidden when the generic reveal trigger had not fired. |
| 4 | Built across every touchpoint | `[data-touchpoints]` | `Group 109.webp`, `logoback.webp`, `card1-4.webp` | Present, but cards were explicitly moved off-canvas and faded out at progress 0. |
| 5 | Connection | `.connection` | `mmm.webp` | Present; reveal-dependent visibility was unsafe. |
| 6 | Refused | `.refused` | `ppp.webp` | Present; real image and copy are available. |
| 7 | Inside the Frame | `.bts` | `bts1-5.webp` | Present with five real images and required editorial labels. |
| 8 | Contextual footer | shared `ContextualFooter` | footer image configuration | Present and shared across routes. |

## Root causes

1. `public/css/tokens.css` initialized every `[data-reveal]` and `[data-stagger] > *` element at `opacity: 0`. The native interaction layer handled `[data-reveal]` but not stagger groups, so proof cards and the BTS gallery could remain hidden.
2. The generic reveal timeline used `fromTo()` with an implicit immediate render. Elements below the fold were therefore hidden before their ScrollTrigger entered, which made full-page capture and non-scrolling access look empty.
3. The touchpoints render function used the archived flight distances (`105vw` and `20vh`) and `autoAlpha: enter`, making all four cards fully off-canvas and invisible at initial progress.
4. The touchpoints section used oversized viewport-based heights on desktop and mobile. Combined with the sticky stage, that produced a disproportionately long black scroll interval for the reference composition.
5. The initial stage clip path began at a narrow top point, so the pattern and cards were visually clipped until the observer fired.

## Corrections

- Static CSS now keeps essential content visible when JavaScript or motion is unavailable; GSAP still supplies the entrance animation when enabled.
- Native GSAP initializes both reveal and stagger groups, with hero groups animating immediately and below-fold groups using `immediateRender: false`.
- Touchpoint cards retain their scroll choreography in one scoped scrubbed GSAP timeline with bounded entry offsets, remain visible, and preserve their final composition.
- Touchpoints use an in-flow portrait artboard with the reference `590 / 745` ratio; the pattern, central logo, four cards, top chevron, and bottom chevrons are available without waiting for a special scroll position.
- Existing assets and original section order were preserved.

## Remaining verification

The exact reference screenshot is a single supplied mobile image; Figma node data was not available. Responsive browser checks and full-page screenshots are required after each visual change.
