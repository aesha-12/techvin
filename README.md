# TECHVIN Machinery — Website Documentation

A production-ready, bilingual (English/Gujarati) static website for TECHVIN Machinery, a Surat-based supplier of Airjet and Waterjet textile weaving machines and spare parts, serving the Indian market.

---

## 1. Project Overview

| | |
|---|---|
| **Client** | TECHVIN Machinery |
| **Industry** | Textile machinery — Airjet & Waterjet weaving looms, spare parts |
| **Business model** | TECHVIN is a **supplier/dealer**, not the original equipment manufacturer. The site never claims TECHVIN designs, engineers, or manufactures the machines — it positions the company as the party that sources, sells, supports, and stocks parts for them. |
| **Market** | India (domestic only) |
| **Languages** | English (en) · Gujarati (gu) |
| **Pages** | 5 — Home, Products, About, Gallery, Contact |
| **Hosting model** | Fully static — no build step, no server, no database |
| **Contact** | Phone: +91 98258 83419 · Email: techvin81@gmail.com |
| **Address** | Plot 14, GIDC Industrial Estate, Surat, Gujarat – 395010, India |

---

## 2. Tech Stack

This is intentionally a **zero-build static site** — no npm install, no bundler, no framework. It can be opened directly in a browser or dropped onto any static host as-is.

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Hand-written CSS3 (custom properties / CSS variables, Grid, Flexbox) — no Tailwind, no Bootstrap |
| Behaviour | Vanilla JavaScript (ES6+), no frameworks, no jQuery |
| Fonts | Google Fonts — **Space Grotesk** (display/headings) + **Inter** (body text), loaded via CDN `<link>` |
| Icons | Inline SVG, hand-coded (no icon font/library) |
| Images | Served externally via Google Drive thumbnail URLs (see §6) |
| Internationalisation | Custom-built JS i18n engine (`js/i18n.js`) — no external i18n library |
| Animation | CSS transitions + `IntersectionObserver` for scroll-reveals; HTML5 Canvas for the hero background animation |
| Forms | Native HTML form elements + vanilla JS validation (no form library) |

**Why no framework?** The brief called for a simple, flexible, easily-hostable static site with no build pipeline — so the entire thing runs by opening `index.html`, with no `node_modules`, no compilation, and no dependency on any package manager at runtime.

---

## 3. Folder Structure

```
techvin-website/
├── index.html                 → Homepage
├── pages/
│   ├── products.html          → All machine series + spare parts catalogue
│   ├── about.html             → Company story, mission, values, timeline
│   ├── gallery.html           → Filterable photo gallery with lightbox
│   └── contact.html           → Contact info + enquiry/quote form
├── css/
│   ├── base.css               → Design tokens, navbar, footer, buttons, global utilities
│   ├── home.css                → Homepage-only styles (hero, stats, range cards, showcase)
│   └── inner.css              → Shared styles for Products/About/Gallery/Contact pages
├── js/
│   ├── i18n.js                 → All EN/GU translation strings + language-switching engine
│   ├── main.js                  → Navbar, mobile menu, scroll-reveal, accordion, filters,
│   │                              lightbox, hero canvas animation, stat counters
│   └── contact-form.js         → Enquiry form logic: dynamic spare-part rows, validation,
│                                  URL param pre-fill, submit/success state
└── assets/
    ├── techvin-logo.png        → Transparent logo mark (background-removed, cropped)
    └── favicon.png             → Smaller favicon derived from the same logo
```

No `node_modules`, no `package.json`, no build artifacts — every file here is shipped as-is.

---

## 4. Design System

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0A0E16` | Primary background (near-black navy) |
| `--steel` | `#141B28` | Card surfaces |
| `--blue` | `#1A5FBE` | Primary brand colour (buttons, links, accents) |
| `--cyan` | `#00AEEF` | Secondary brand accent (logo-derived) |
| `--navy-deep` | `#0D2050` | Gradient depth in hero/CTA bands |
| `--brass` / `--brass-light` | `#C8954B` / `#E0B873` | Warm metal accent — used sparingly for "specialist" tags, ghost lettering, value icons |
| `--paper` | `#F6F7F9` | Primary text colour |

**Typography:** Space Grotesk (headings, labels, buttons — geometric/mechanical feel fitting the gear-and-nozzle logo) + Inter (body copy, tables, form fields).

**Signature visual motif:** An animated warp/weft canvas in the homepage hero — thin crossing lines that reference woven fabric structure, rendered at low opacity so it reads as texture rather than decoration.

---

## 5. Page-by-Page Breakdown

### Home (`index.html`)
- Animated canvas hero with warp/weft thread motion
- Auto-counting stat band (years in business, machine series, max RPM, India-served %)
- Two-card "Our Range" section (Airjet / Waterjet) linking into Products
- "Why TECHVIN" 4-point grid
- Photo showcase strip pulling from Google Drive
- CTA band driving to Contact/Products

### Products (`pages/products.html`)
- Filterable by Airjet / Waterjet / All
- **7 machine models** with full spec tables:
  - **Airjet:** YC920 (Ultra-Speed), YC910 (Heavy), YC917 (Towel Fabric), YC600 (Economic)
  - **Waterjet:** JW8200 (Ultra-Speed), JW408 (Heavy), JW822 (Economic)
- Each machine card includes: tag/specialist label, description, "best suited for" callout, spec grid (speed, reed width, weft selection, shedding, etc.), and a "Request Quote for This Model" button that deep-links to the Contact form pre-filled via URL parameter
- **9-category spare parts accordion** (72+ individual catalogued parts): Nozzle & Air System, Drive & Tension, Cutter Mechanism, Lubrication & Pneumatics, Shedding & Frame, Yarn & Selvedge, Measuring & Auxiliary, Electronic Components, Heavy Consumables
- After-sales services grid (installation, training, parts supply, technical support line)

### About (`pages/about.html`)
- Company story — framed as a supply/sourcing partner, not a manufacturer
- Mission statement
- Three core values (Uptime First, Suited to India's Mills, Parts You Can Get)
- Timeline: 2014 (founded) → 2017 (Waterjet line added) → 2020 (Ultra-Speed series brought in) → 2024 (full parts ecosystem completed)

### Gallery (`pages/gallery.html`)
- Masonry photo grid, filterable by Airjet/Waterjet
- Click-to-expand lightbox with keyboard navigation (arrow keys, Esc)

### Contact (`pages/contact.html`)
- Office & Warehouse address, phone, email (no business hours shown — removed per request)
- Embedded Google Map
- **Enquiry form** with:
  - Enquiry-type toggle: New Machine Purchase / Spare Parts Order / Service-Support / Other
  - When "Spare Parts Order" is selected, a dynamic line-item section appears where the user can add/remove multiple part name + quantity rows
  - Machine-of-interest dropdown (auto-selected if arriving from a Products page "Request Quote" link)
  - Client-side validation (required name, 10-digit phone, valid email format)
  - Success state with confirmation message after submission

---

## 6. Image Handling

All machine and gallery photos are served directly from Google Drive using the public thumbnail endpoint:

```
https://drive.google.com/thumbnail?id=[FILE_ID]&sz=w[WIDTH]
```

This avoids hosting large image files locally. **Important:** these Drive files must remain set to "Anyone with the link can view" — if sharing permissions are ever changed to private, images across the site will break. For a more permanent production setup, consider migrating these images into the `assets/` folder or a CDN before long-term go-live.

The only locally-hosted images are the logo and favicon (`assets/techvin-logo.png`, `assets/favicon.png`), both background-removed and cropped from the original brand file supplied by the client.

---

## 7. Internationalisation (i18n)

- All user-facing text lives in `js/i18n.js` as two parallel objects (`en` and `gu`), keyed by the same identifiers.
- Every translatable element in the HTML carries a `data-i18n="key_name"` attribute.
- On page load (and on language-button click), `applyLang()` walks every `data-i18n` element and swaps in the matching string for the active language, persisting the choice to `localStorage` so it survives page navigation.
- Language switcher appears in both the navbar (desktop + mobile) and the footer.
- **Note on fallback text:** the raw English text inside each HTML tag (before JS runs) is treated as the canonical fallback — it intentionally matches the `en` object exactly, so the page is fully meaningful even if JavaScript fails to load.

To add a third language in future: duplicate the `en: {...}` block in `i18n.js`, translate every value, add a new `<button data-lang-btn="xx">` in the nav and footer of every page.

---

## 8. Important Notes for Go-Live

| Item | Status | Action Needed |
|---|---|---|
| Contact form backend | ⚠️ Not connected | Currently logs the form payload to the browser console and shows a success message — **no email is actually sent**. Wire this to **Formspree**, **Netlify Forms**, or **EmailJS** before launch (all three work with static sites, no backend required). |
| Company positioning | ✅ Fixed | Site explicitly avoids any "we manufacture/we design/we engineer" language — TECHVIN is consistently positioned as a supplier and support partner. |
| Phone / Email | ✅ Live values | +91 98258 83419 / techvin81@gmail.com |
| Business hours | ✅ Removed | Per client request, no hours are displayed anywhere on the site. |
| Logo | ✅ Fixed | Original upload was a flattened JPEG with a solid black background; it has been background-removed and tightly cropped to a transparent PNG. |
| Image hosting | ⚠️ Dependent on Google Drive | See §6 — confirm sharing permissions stay public, or migrate to local/CDN hosting before long-term launch. |
| Machine specs & history | ⚠️ Needs client confirmation | Years in the About timeline (2014/2017/2020/2024) and some descriptive copy were written based on available reference material — confirm these dates and any factual claims with the actual business owner before publishing. |

---

## 9. How to Deploy

Since this is a static site with no build step, deployment is just "upload the folder":

- **Netlify / Vercel:** drag-and-drop the project folder, or connect a Git repo — no build command needed (or set build command to none / output directory to `/`)
- **GitHub Pages:** push to a repo, enable Pages on the root or `/docs` branch
- **Any shared hosting / cPanel:** upload all files via FTP into `public_html/`

No environment variables, no `.env` file, no server-side configuration required.

---

## 10. Browser Support

Built with modern CSS (custom properties, Grid, `aspect-ratio`) and modern JS (`IntersectionObserver`, ES6 classes/arrow functions). Fully supported in all current versions of Chrome, Edge, Firefox, and Safari. No Internet Explorer support (not required for this use case).

`prefers-reduced-motion` is respected — animations are disabled for users who have that OS-level preference set.

---

*Document prepared as part of the TECHVIN Machinery website build. Last updated alongside the contact-info, logo, and supplier-positioning revisions.*
