# Feature parity

| Feature group | Status | Evidence |
|---|---|---|
| English home and Arabic home markup | Preserved | Existing bodies are rendered from source documents. |
| Shared navigation/footer | Preserved | `js/layout.js` remains loaded on every route. |
| Portfolio categories/gallery | Preserved | `js/main.js` remains loaded; browser interaction tests remain. |
| Services interaction | Preserved | Existing source and script retained. |
| Contact fields and appearance | Preserved | Existing `legacy-pages/contact.html` retained. |
| Contact delivery | Improved/fixed | Server endpoint added; no false success without provider confirmation. |
| GSAP architecture | Blocked/in progress | Not yet replaced; legacy animation behavior retained. |
