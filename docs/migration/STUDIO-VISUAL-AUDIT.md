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
- Touchpoints now use the measured primary supplied frame ratio `1852 / 2067` (0.89599) at every viewport. The frame is full-width on desktop and scales proportionally on tablet/mobile; it is no longer constrained to the earlier 590px/590:745 artboard.
- Existing assets and original section order were preserved.

## Measured supplied-frame specification

Figma MCP access was unavailable for the referenced file, so this specification is grounded in the supplied captures and their visible selection readouts. No hidden Figma properties are inferred as facts.

| Element | Supplied measurement | Normalized primary-frame value | Treatment |
|---|---:|---:|---|
| Primary Touchpoints frame | 1852 × 2067 | 100% × 100% | Implemented as the section aspect ratio. |
| Alternate Touchpoints frame | 1852 × 2049 | 100% × 99.13% | Treated as an 18px revision/alternate capture; not averaged. |
| Heading selection | 991 × 198 | 53.51% × 9.58% | Width and centered placement implemented; text height follows responsive type scale. |
| Subtitle selection | 887 × 189 | 47.90% × 9.14% | Width implemented inside the centered copy block; three-line wrap preserved. |
| Selected rotated card bounds | 691.04 × 864.37 | 37.31% × 41.82% | Card image width follows the measured selection width; rotation remains GSAP-controlled. |

The following positions are screenshot-derived and therefore explicitly inferred rather than exposed Figma coordinates: heading top 17%, upper cards top 30.5% with 4% side insets, lower cards top 52.5% with 6% side insets, logo visual center at approximately 52% (the image box is placed at 60% because the supplied logo asset includes internal white framing), and the existing layered chevron boundary at the bottom of the frame.

## Remaining verification

The exact supplied captures were used for the measured reconstruction. Figma node data was not available because the referenced file returned access denied. Responsive browser checks and full-page screenshots remain required after each visual change.
