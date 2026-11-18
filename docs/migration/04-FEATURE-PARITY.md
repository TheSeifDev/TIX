# Feature parity

| Feature group | Status | Evidence |
|---|---|---|
| English home and Arabic home markup | Preserved | Native `HomeContent` and `ArabicHomeContent` trees retain the original section order and content. |
| Shared navigation/footer | Preserved | Native `Navbar`, `SitePage`, and `ContextualFooter` components render the shared layout. |
| Portfolio categories/gallery | Preserved | Native work markup retains all category strips and images; clean-route browser coverage passes. |
| Work card expansion | Improved by correction | Pointer hover/focus expands width only and restores on leave; no click popup or overlay is attached. |
| Services interaction | Preserved | Existing source and script retained. |
| Contact fields and appearance | Preserved | Existing `legacy-pages/contact.html` retained. |
| Contact delivery | Improved/fixed | Server endpoint added; no false success without provider confirmation. |
| GSAP architecture | Improved/in progress | Scoped GSAP reveal, hero, Disrupt pin, and WorkLens effects are implemented; remaining interactions are still under browser verification. |
