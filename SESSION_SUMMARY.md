# BPG Website Build Session — May 3, 2026

## Session Summary

### What Was Built
Complete BPG (Brick Lane Property Group) website with full E2E test coverage.

### Tech Stack
- **Frontend:** Vue 3 + Vite + TypeScript + Tailwind CSS
- **Backend:** CodeIgniter 4 (PHP) on port 8080
- **Frontend dev server:** Port 3002
- **E2E testing:** Playwright (Chromium-only, 97 tests)
- **Image generation:** MiniMax AI API

### Brand Tokens
- Primary: `#0F766E` (teal)
- Secondary: `#14B8A6` (lighter teal)
- CTA: `#0369A1` (blue)
- Background: `#F0FDFA`
- Fonts: Cinzel (headings) + Josefin Sans (body)

---

## Major Fixes Applied

### 1. AdminLayout Recursion Bug (Root Cause)
- **Problem:** 5 child admin components (Dashboard, Leads, LeadDetail, Settings, Analytics) each wrapped themselves in `<AdminLayout>`, which has a `<slot>` that renders the parent's `<RouterView>` → infinite loop (stack overflow)
- **Fix:** Removed `<AdminLayout>` wrapper from all 5 child components; added `<RouterView />` to `AdminLayout.vue`'s `<main>` tag
- **Files changed:** `client/src/pages/admin/{AdminLayout,Dashboard,Leads,LeadDetail,Settings,Analytics}.vue`

### 2. LeadDetail.vue fetchLead() Bug
- **Problem:** `leadsStore.fetchLead(id)` sets `currentLead.value` internally but returns `undefined`. Component did `lead.value = await leadsStore.fetchLead(id)` which set `lead = undefined`, making `v-if="lead"` false → always showed "Lead not found"
- **Fix:** `await leadsStore.fetchLead(id)` then `lead.value = leadsStore.currentLead`
- **File:** `client/src/pages/admin/LeadDetail.vue`

### 3. AppHeader Contrast on Hero Pages
- **Problem:** Full-bleed hero images with dark overlay made the transparent header's dark text (`text-text-main`) invisible
- **Fix:** Header text switches to white (`text-white`) when not scrolled; reverts to dark when scrolled
- **File:** `client/src/components/layout/AppHeader.vue`

### 4. E2E Test Selector Fixes
- Exact placeholder text matching (`James`, `0412 345 678`, etc.)
- `.first()` / `aside >>` scoping for ambiguous locators
- Navigation-from-leads-list for `router.back()` test
- Fixed `span.capitalize` → correct status badge selector
- `mockApiRoutes()` URL pattern: `'**/api/v1/leads*'` (wildcard for both `/leads` and `/leads/1`)

---

## Images Generated (MiniMax AI)

**9 images saved to `client/public/images/`**

| File | Used On | Prompt Summary |
|---|---|---|
| `hero-landlords.jpg` | Home hero + Landlords hero (full-bleed) | Aerial modern Australian home with pool, golden hour |
| `hero-partners.jpg` | Partners hero (full-bleed) | Business team in corporate boardroom, city skyline |
| `team-office.jpg` | Home "Why Choose Us" + About "Our Story" | Professional real estate team meeting in Sydney office |
| `landlord-headshot-1.jpg` | Home testimonial — Michael Chen | Middle-aged male investor, professional portrait |
| `landlord-headshot-2.jpg` | Home testimonial — Sarah Thompson | Female property investor, warm expression |
| `landlord-headshot-3.jpg` | Home testimonial — David & Jane Williams | Senior male investor, wise confident expression |
| `office-sydney.jpg` | Contact page — Sydney (HQ) | Modern glass office building, Sydney CBD |
| `office-melbourne.jpg` | Contact page — Melbourne | Modern glass office building, Melbourne CBD |
| `office-brisbane.jpg` | Contact page — Brisbane | Modern office tower, Brisbane CBD with river |

**MiniMax API key:** `sk-cp-y5-RF2dVkbQQiysLXR_HiySGAIEz_4gdUgeMXS85Q-dozzMkJiustsxZYvSwO6Af-3arkA07cxCtnUBO7IColryW0g6t68j8Vcfg3icWRBgR0ct6LGON024`

---

## Logo Design Prompts

### Design 1 — Modern Monogram with Architectural Touch
> "Minimalist professional logo for 'Brick Lane Property Group', Australian real estate management company. Teal rounded square icon with white stylized letter 'B' formed from architectural elements — a subtle house rooftop integrated into the B letterform, clean geometric lines, no gradients. 'Brick Lane' in elegant serif typography below in dark teal, 'Property Group' in clean sans-serif underneath in lighter gray. White background. Vector-style, flat design, professional brand mark suitable for website header. High contrast, modern, trustworthy."

### Design 2 — Abstract House Mark
> "Professional logo design for 'Brick Lane Property Group', Australian property management company. Circular teal icon with white abstract house silhouette inside — clean geometric home shape suggesting residential real estate, not literal. 'Brick Lane' in bold serif font below the icon in deep teal, 'Property Group' in clean sans-serif in muted gray underneath. Completely white background. Modern minimalist brand identity, flat design, architectural elegance, suitable for website header and business cards. No gradients, precise geometric shapes, premium feel."

### Design 3 — B Badge with Architectural Accent
> "Sophisticated logo for 'Brick Lane Property Group', premium Australian property management firm. Stylized teal badge or shield shape containing an elegant white letter 'B' monogram with subtle brick pattern texture suggested in negative space. 'Brick Lane' bold serif typography in dark charcoal below. Clean white background, premium luxury real estate brand feel. Flat design, vector style, no gradients. High-end trustworthy aesthetic."

---

## Test Results: 97/97 Passing

### Test Coverage
- **Admin pages:** Dashboard, Leads, LeadDetail, Settings, Analytics (mocked API)
- **Public pages:** Home, About, Contact, Partners, Landlords
- **Navigation:** Header links, footer links, mobile menu, page routing
- **Forms:** Landlord form, Partner form, Contact form (submission + validation)
- **E2E infrastructure:** `playwright.config.js` (ESM), `mockData.ts` with `mockApiRoutes()`

### Key Test Patterns
- Admin tests use `page.route()` intercepts for API mocking
- Single worker (`--workers=1`) for reliable test isolation
- Exact text matching for form placeholders, CTAs, content

---

## Git History

| Commit | Description |
|---|---|
| `36c0059` | fix: motion-vue, ResponseInterface controllers, dev deployment setup |
| `4a88e6a` | fix: PHPUnit infrastructure, controller return types, TypeScript, CI4 config |
| `f9ea1df` | test(e2e): add Playwright E2E tests for all pages and forms |
| `063fa12` | feat(seo): add JSON-LD schemas, sitemap, robots.txt, meta tags |
| `a1c580d` | feat(frontend): complete marketing pages |
| `5d2d50f` | fix: AdminLayout recursion bug, E2E selectors, LeadDetail fetchLead |
| `298c6fa` | feat: add AI-generated images to all pages |
| `c308339` | fix: AppHeader white text on transparent hero pages |

---

## Running the Project

```bash
# Frontend (port 3002)
cd /Users/archerterminez/Documents/bricklane-property-group/client
npm run dev

# Backend (port 8080)
cd /Users/archerterminez/Documents/bricklane-property-group/server
php -S localhost:8080 -t public

# Run E2E tests
cd /Users/archerterminez/Documents/bricklane-property-group/client
npx playwright test --reporter=list --workers=1

# Generate images (MiniMax)
python3 /var/folders/_v/3_x_cwpx01vbklkwtk2jp7q00000gn/T/gen_bpg_images.py
```

---

## Remaining Items

- [ ] Replace current letter "B" logo with one of the 3 AI-generated logo designs
- [ ] About page hero could benefit from a team/hero background image (currently only gradient)
- [ ] Consider adding a favicon SVG matching the new logo
