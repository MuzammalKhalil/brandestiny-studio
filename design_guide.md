# Design Spec: artemiilebedev.com Clone
> Full design system extracted from artemiilebedev.com — Art Director & UI Designer portfolio

Design Ref :
https://artemiilebedev.com/
Design Ref 2:
https://skvarenina.com/
---

Preview Link:
https://www.figma.com/proto/jdsODBIF7I7XYNTSCWOxQq/Brandestiny---Brand?page-id=228%3A2&node-id=228-485&p=f&viewport=555%2C25%2C0.1&t=X1DVdeB6vxbslMB3-1&scaling=min-zoom&content-scaling=fixed

Dev Mode Link:
https://www.figma.com/design/jdsODBIF7I7XYNTSCWOxQq/Brandestiny---Brand?node-id=228-533&m=dev&t=Y7Mk0OBW3QUBuPbx-1


## 1. DESIGN PHILOSOPHY

- **Ultra-minimal dark aesthetic** — near-black background, white type, no decorative noise
- **Editorial / fashion-mag feel** — large type, extreme whitespace, confident sparse layout
- **Motion-forward** — blur on hover, smooth 0.45s transitions throughout, canvas-based custom cursor
- **Mix-blend-mode tricks** — header uses `mix-blend-mode: difference` on mobile so the white logo inverts over any background
- **Fluid type scale** — base `font-size: 1vw` on body; everything cascades using `em` units
- **No decorative borders** — borders only at 15–45% white opacity, used strictly as structural dividers
- **Hover = blur** — interactive elements fade + blur on hover rather than color change

---

## 2. COLOR PALETTE
```css
:root {
  --black-2: #020202;   /* Primary background — near-pure black */
  --black:   #090909;   /* Secondary surface (inputs, footer bg) */
  --white:   #ffffff;   /* Primary text & foreground elements */
  --grey:    #a0a0a0;   /* Muted/secondary text */

  /* Opacity variants used throughout */
  --white-15:  rgba(255, 255, 255, 0.15);  /* Subtle card borders */
  --white-25:  rgba(255, 255, 255, 0.25);  /* Column dividers */
  --white-35:  rgba(255, 255, 255, 0.35);  /* Section divider lines */
  --white-45:  rgba(255, 255, 255, 0.45);  /* Form field borders */
  --white-85:  rgba(255, 255, 255, 0.85);  /* Form field borders on hover */
  --overlay-dark:   rgba(0, 0, 0, 0.57);   /* Service card overlay */
  --overlay-medium: rgba(0, 0, 0, 0.45);   /* Gallery overlay */
  --overlay-light:  rgba(0, 0, 0, 0.57);   /* Announcement/modal overlay */
  --accent-red: rgb(253, 29, 29);           /* Rare accent — error states only */

  /* Footer special */
  --footer-bg: rgb(250, 249, 245);          /* Off-white footer background */
}
```

### Color Usage Map

| Token | Where Used |
|---|---|
| `--black-2` | `<body>` background, main page surface |
| `--black` | Newsletter input bg, footer sections |
| `--white` | All body text, tag fills, button hover fills |
| `--grey` `#a0a0a0` | Project names, years, industry labels |
| `--white-15` | Social block borders, card borders |
| `--white-25` | Hero section nav dividers, exhibition column separators |
| `--white-45` | Form inputs, textarea, checkbox borders |
| `--accent-red` | Error/validation messages only |

---

## 3. TYPOGRAPHY

### Font Families
```css
/* PRIMARY: Neue Montreal — all headings, body, nav */
@font-face {
  font-family: 'n-c';
  src: url('NeueMontreal-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'n-c';
  src: url('NeueMontreal-Medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'n-c';
  src: url('NeueMontreal-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* SECONDARY: Pexel Grotesk — category labels, filter pills */
@font-face {
  font-family: 'p-g';
  src: url('PexelGrotesk-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

> **Free alternatives if you can't source these fonts:**
> - Neue Montreal → **DM Sans** or **Plus Jakarta Sans** (Google Fonts)
> - Pexel Grotesk → **Space Grotesk** or **IBM Plex Sans** (Google Fonts)

### Global Body Type
```css
body {
  font-family: 'n-c', sans-serif;
  font-size: 1vw;           /* Root fluid size — all em values cascade from here */
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: var(--white);
  background-color: var(--black-2);
}
```

### Full Type Scale

| Class / Element | Font | Size | Weight | Line Height | Notes |
|---|---|---|---|---|---|
| `h1` | n-c | `3.5em` | 400 | `1` | Standard page headings |
| `h2` | n-c | `3.5em` | 400 | `1` | Width: `22ch` |
| `h3` | n-c | `2.1em` | 400 | `1` | Sub-headings |
| `.h1` (custom) | n-c | `92px` / `5.5em` | 400 | `1` | Hero & archive big headlines |
| `.h_link` | n-c | `5em` (~57px) | 400 | `1` | Hero navigation labels |
| `.tagline_services` | n-c | `2.55em` | 500 | `1` | Services section tagline |
| `.next__txt` | n-c | `2.5em` | 500 | `1.3` | Next-page transition label |
| `.exhibition_name` | n-c | `1.9em` | 500 | `0.8` | Exhibition card title |
| `p` | n-c | `1em` | 400 | `1.4` | Body text, width: `73ch` |
| `.logotype` | n-c | `1vw` | 500 | — | Header brand wordmark |
| `.email-link` | n-c | `0.9em` | 500 | — | Header email link |
| `.time` | n-c | `0.9em` | 500 | — | Live clock in header |
| `.h__link` | n-c | `0.9em` | — | — | Header nav links |
| `.client__name` | n-c | `1.1em` | — | — | Client name label |
| `.project__name`, `.year__c`, `.industry__name` | n-c | `1.1em` | — | — | Color: `#a0a0a0` |
| `.client` | n-c | `0.8em` | — | — | Small client descriptor |
| `.services_info` | n-c | `0.86em` | — | `1.3` | Service card description |
| `.project_info` | n-c | `0.86em` | 400 | — | Project overlay text |
| `.newest_services` | n-c | `0.83em` | 500 | `1` | Color: `rgba(2,2,2,0.65)` |
| `.view-all` | n-c | `0.81em` | 500 | — | "View All" CTA |
| `.field__subscribe` | n-c | `0.9em` | — | — | Newsletter input |
| `.to-top`, `.city`, `.copyright` | n-c | `0.9em` | 500 | — | Footer bottom strip |
| `.p__g` | p-g | inherited | 400 | — | Secondary font class |

---

## 4. LAYOUT & SPACING SYSTEM

**Full-bleed, edge-to-edge design.** Horizontal gutter is `24px` on desktop, `16px` on mobile. No max-width container — everything spans the full viewport width.

### Page Section Order
```
1. FIXED HEADER        — 38px tall, transparent, z-index: 9999
2. HERO                — 100vw × 100vh, full bleed
3. FEATURED PROJECTS   — Sticky sidebar + scrolling list
4. MUSIC VISUALS       — Full-bleed visual section
5. KEY SERVICES        — Horizontal drag slider
6. EXHIBITIONS         — 3-column grid
7. NEXT PAGE LINK      — Full-width hover-fill bar
8. FOOTER              — 3-column flex layout
```

### Core Wrapper Classes
```css
/* Main inner-page content wrapper */
.wrapper__c {
  padding: 112px 24px 212px;
}
.wrapper__c.special           { padding: 172px 24px 52px; }
.wrapper__c.special.special_last { padding-top: 42px; padding-bottom: 112px; }
.wrapper__c.special_awards    { padding-top: 132px; padding-bottom: 192px; }
.wrapper__c.about             { z-index: 10; height: 100%; padding-bottom: 20px; }

/* Header content wrapper */
.wrapper__h {
  width: 100%;
  padding-top: 20px;
  padding-left: 24px;
  padding-right: 24px;
}

/* Footer wrapper */
.wrapper__f {
  padding: 32px 0 20px;
}
```

### Key Layout Patterns
```css
/* Full-width flex row (used everywhere) */
.flex__h {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

/* Inner content — 80% width, right-aligned (leaves 20% for label on left) */
.flex__h_in {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 80%;
  margin-left: auto;
}

/* Featured projects — sticky sidebar + scroll list */
.inside__h_in.featured_sticky {
  display: flex;
  flex-flow: column;
  order: 1;
  width: 36%;
  height: 100%;
  position: sticky;
  top: 92px;
}
.inside__h_in.list__a {
  display: flex;
  flex-flow: column;
  width: 44.8%;
  height: 100%;
}

/* Exhibitions — 3 equal columns, no gap */
.exhibitions_previews {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
}

/* Footer columns */
.flex__f { display: flex; width: 100%; }
.main_menu { width: 30.5%; margin-right: 6px; }
.newsletter { width: 36%; margin-left: auto; }
.city_copyright {
  display: flex;
  justify-content: space-between;
  width: 35.5%;
  margin-left: auto;
}
```

---

## 5. CUSTOM CURSOR

The cursor is a **full-viewport Canvas element** that draws a trailing circle following the mouse. The native system cursor is hidden.

### HTML Structure
```html
<!-- Canvas injected by JS — covers full viewport -->
<canvas id="custom-cursor"></canvas>

<!-- CSS fallback dot (shown if canvas fails) -->
<div class="cursor">
  <div class="div-block-57"></div>
</div>
```

### Canvas CSS
```css
#custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none; /* Critical: clicks pass through */
}

/* Hide native cursor on desktop */
body { cursor: none; }
```

### Fallback Dot CSS
```css
.cursor {
  position: fixed;
  inset: 0%;
  z-index: 9999999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.div-block-57 {
  background-color: var(--white);
  border-radius: 100%;
  width: 8px;
  height: 8px;
}
```

### Canvas Cursor JavaScript (Full Implementation)
```javascript
(function () {
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'custom-cursor';
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '9999',
    pointerEvents: 'none',
  });
  document.body.appendChild(canvas);
  document.body.style.cursor = 'none';

  const ctx = canvas.getContext('2d');

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let isHovering = false;
  const LERP = 0.12; // Lower = more lag/trail

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Detect hover on interactive elements
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest('a, button, [role="button"], input, label, .project__link');
    isHovering = !!el;
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Smooth cursor follows mouse
    cursor.x = lerp(cursor.x, mouse.x, LERP);
    cursor.y = lerp(cursor.y, mouse.y, LERP);

    const radius = isHovering ? 28 : 10;
    const alpha  = isHovering ? 0.6 : 0.9;

    // Outer trailing circle
    ctx.beginPath();
    ctx.arc(cursor.x, cursor.y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner precise dot at actual mouse
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fill();

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();

  // Disable on touch/tablet
  if (window.innerWidth <= 991 || 'ontouchstart' in window) {
    canvas.style.display = 'none';
    document.body.style.cursor = 'auto';
  }
})();
```

### Cursor Disabled on Mobile
```css
@media screen and (max-width: 991px) {
  .cursor,
  .cursor_embed,
  #custom-cursor {
    display: none !important;
  }
  body { cursor: auto !important; }
}
```

---

## 6. HEADER / NAVIGATION

### Visual Layout
```
[Logo]  [Live Clock]  [Email]  ·········  [Work, Exhibitions, Stories, About.]  [Inquiries ↗]
```

### HTML
```html
<nav class="header">
  <div class="wrapper__h">
    <div class="flex__h">

      <!-- Logo -->
      <a class="logotype" href="/">Artemii Lebedev</a>

      <!-- Live clock -->
      <span class="time">12:27 PM CET</span>

      <!-- Email -->
      <a class="email-link" href="mailto:hello@example.com">hello@example.com</a>

      <!-- Desktop nav links -->
      <a class="h__link" href="/work">Work,</a>
      <a class="h__link" href="/exhibitions">Exhibitions,</a>
      <a class="h__link" href="/stories">Stories,</a>
      <a class="h__link" href="/about">About.</a>

      <!-- Inquiries CTA pill -->
      <a class="link-block" href="/inquiries">
        Inquiries
        <img src="/arrow-white.svg" alt="↗" width="16" height="16">
      </a>

    </div>
  </div>
</nav>
```

### Header CSS
```css
.header {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 38px;
  background: transparent;
}

.logotype {
  font-family: 'n-c', sans-serif;
  font-size: 1vw;
  font-weight: 500;
  color: var(--white);
  text-decoration: none;
}

.time {
  font-size: 0.9em;
  font-weight: 500;
  color: var(--white);
  margin-left: 52px;
}

.email-link {
  font-size: 0.9em;
  font-weight: 500;
  color: var(--white);
  text-decoration: none;
  transition: opacity 0.4s;
  margin-left: 16px;
}
.email-link:hover { opacity: 0.55; }

.h__link {
  font-size: 0.9em;
  font-family: 'n-c', sans-serif;
  color: var(--white);
  text-decoration: none;
  padding: 1px 2px;
  position: relative;
  transition: opacity 0.4s;
}
.h__link:hover { opacity: 0.55; }

/* Pill button — Inquiries */
.link-block {
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 10px 16px 9px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 100em;
  color: var(--white);
  text-decoration: none;
  font-size: 0.9em;
  gap: 8px;
  transition: border-color 0.4s;
}
.link-block:hover { border-color: var(--white); }

/* Mobile: blend mode so white logo inverts over content */
@media (max-width: 767px) {
  .header {
    mix-blend-mode: difference;
    align-items: center;
  }
}
```

### Live Clock JavaScript
```javascript
function updateClock() {
  const now = new Date();
  const opts = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Belgrade', // adjust to your timezone
    hour12: true
  };
  document.querySelector('.time').textContent =
    now.toLocaleTimeString('en-US', opts) + ' CET';
}
setInterval(updateClock, 1000);
updateClock();
```

---

## 7. HERO SECTION

Full-viewport section with a **3D/cinematic visual** (image, video or WebGL) centered. Two large nav labels sit bottom-left ("Work") and bottom-right ("Exhibitions"). A floating announcement card sits bottom-right.

### Layout
```
┌──────────────────────────────────────────────┐
│                                              │
│         [3D Character / Hero Visual]         │
│                                              │
│  Work ↙                      Exhibitions ↗  │
│                    [New Case Study card ↗]   │
└──────────────────────────────────────────────┘
```

### HTML
```html
<section class="hero__h">

  <!-- Background visual -->
  <div class="hero-bg">
    <!-- video, image, or canvas/WebGL -->
    <video autoplay muted loop playsinline src="hero.mp4"></video>
  </div>

  <!-- Bottom nav labels -->
  <div class="hero-nav">
    <a class="h_link" href="/work">Work</a>
    <a class="h_link" href="/exhibitions">Exhibitions</a>
  </div>

  <!-- Sticky announcement card -->
  <div class="bottom sticky_modal">
    <a class="new_case" href="/case-study">
      <img src="thumbnail.jpg" alt="Case study thumbnail">
      <div>
        <span class="label">NEW CASE STUDY</span>
        <img src="arrow.svg" alt="↗">
        <h4>Project Name</h4>
        <p>Take a look and show it some love!</p>
      </div>
    </a>
  </div>

</section>
```

### CSS
```css
.hero__h {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: var(--black-2);
}

/* Big hero nav labels */
.h_link {
  font-family: 'n-c', sans-serif;
  font-size: 5em;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.01em;
  color: var(--white);
  text-decoration: none;
  display: block;
  transition: opacity 0.45s, filter 0.45s;
}
.h_link:hover {
  opacity: 0.5;
  filter: blur(2px);
}

/* Sticky announcement card */
.bottom.sticky_modal {
  z-index: 6;
  width: 100%;
  margin-top: 0;
  padding-left: 24px;
  padding-right: 0;
  position: sticky;
  bottom: 20px;
}

.new_case {
  background-color: var(--white);
  color: var(--black-2);
  width: 26em;
  margin-left: auto;
  padding: 6px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-decoration: none;
}
```

---

## 8. FEATURED PROJECTS SECTION

Two-column layout: sticky left sidebar + right scrolling project list.

### CSS
```css
/* Section wrapper uses flex__h pattern */
.projects { margin-top: 16px; }

/* Left: sticky info panel */
.inside__h_in.featured_sticky {
  display: flex;
  flex-flow: column;
  order: 1;
  width: 36%;
  height: 100%;
  position: sticky;
  top: 92px;
}

/* Right: scrolling project list */
.inside__h_in.list__a {
  display: flex;
  flex-flow: column;
  width: 44.8%;
  height: 100%;
}

/* Project link row */
.project__link {
  display: block;
  position: relative;
}

/* Project hover info overlay */
.featured_info {
  opacity: 0;
  display: flex;
  flex-flow: column;
  padding: 0;
  position: absolute;
  inset: 0%;
  transition: opacity 0.45s;
}
.project__link:hover .featured_info { opacity: 1; }

.project_info {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  font-size: 0.86em;
  font-weight: 400;
  color: var(--white);
  letter-spacing: 0.01em;
  text-transform: none;
  background: transparent;
}

/* Meta text colors */
.project__name,
.industry__name,
.year__c {
  color: #a0a0a0;
  font-size: 1.1em;
}

/* View All CTA */
.view-all {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 42px;
  padding: 12px;
  font-family: 'n-c', sans-serif;
  font-size: 0.81em;
  font-weight: 500;
  color: var(--white);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.45);
  text-decoration: none;
  transition: all 0.45s;
}
.view-all:hover {
  border-color: var(--white);
  background-color: var(--white);
  color: var(--black);
}
```

---

## 9. KEY SERVICES SLIDER

Horizontal drag-to-scroll carousel using **Splide.js**. No visible arrows or pagination dots.
```css
.splide-container {
  margin-left: auto;
  margin-right: auto;
  padding: 42px 0 172px 40px;
  overflow: hidden;
}

.splide__track { overflow: visible; }

.splide__list {
  cursor: grab;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
}

/* Each service card is 1/3 viewport */
.splide__slide {
  flex: 0 0 auto;
  width: 33.3333%;
  margin-right: 16px;
}

/* Hide built-in controls */
.splide__arrows,
.splide__pagination { display: none; }

/* Card overlay layers */
.service_overlay {
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.57);
  width: 100%;
  height: 100%;
  position: relative;
}

.overlay_bg {
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.45);
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0%;
}

/* Service info text over image */
.services_info {
  display: flex;
  flex-flow: column;
  gap: 0;
  opacity: 0.8;
  color: var(--white);
  letter-spacing: 0.02em;
  width: 50%;
  margin-top: auto;
  padding: 10px 12px;
  font-size: 0.86em;
  line-height: 1.3;
}

.tagline_services {
  letter-spacing: -0.025em;
  margin: 0;
  font-size: 2.55em;
  font-weight: 500;
  line-height: 1;
}

.newest_services {
  color: rgba(2, 2, 2, 0.65);
  font-family: 'n-c', sans-serif;
  font-size: 0.83em;
  font-weight: 500;
  line-height: 1;
}

.services_release {
  opacity: 0.65;
  color: var(--black);
  margin-top: 2px;
  font-size: 0.8em;
}

/* Horizontal flex for links */
.links_services {
  display: flex;
  gap: 8px;
  margin-left: auto;
}
```

**Services listed:** Art Direction · UX/UI · Web & App · Branding · Development · Motion

---

## 10. EXHIBITIONS SECTION

Three-column full-height grid. Each cell has a background image/video that reveals on hover.
```css
.exhibitions_previews {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
}

.exhibition_preview_box {
  height: 43em;
  padding: 24px;
  position: relative;
}

/* Right border as column divider */
.exhibition_preview_box.one,
.exhibition_preview_box.two {
  border-right: 1px solid rgba(255, 255, 255, 0.25);
}

.exhibition_name {
  font-size: 1.9em;
  font-weight: 500;
  line-height: 0.8;
  color: var(--white);
}

.exhibition_info {
  z-index: 2;
  position: relative;
}

/* Video/image — hidden by default, shown on hover */
.exhibition_video {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0%;
  display: none;
  object-fit: cover;
}
.exhibition_preview_box:hover .exhibition_video { display: block; }

/* Full-bleed exhibition page image */
.exhibition_fullsize {
  width: 100%;
  height: 100vh;
  margin-top: 2px;
  object-fit: cover;
}

/* 3-up small grid */
.exhibition_smalls {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2px;
  margin-top: 2px;
}

/* 2-up split */
.exhibition_two_sides {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  margin-top: 2px;
}
```

---

## 11. NEXT PAGE TRANSITION BAR

Full-width link bar separating sections. White fill expands from left on hover.
```css
.next-page {
  display: block;
  position: relative;
  background-color: transparent;
  border-top: 1px solid rgba(255, 255, 255, 0.35);
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  transition: background-color 0.45s;
}
.next-page:hover { background-color: var(--white); }

/* Expanding bg layer */
.next__bg {
  z-index: -1;
  background-color: var(--white);
  width: 0%;
  margin-right: auto;
  position: absolute;
  inset: 0%;
  transition: width 0.45s ease;
}
.next-page:hover .next__bg { width: 100%; }

.wrap__next {
  width: 100%;
  padding: 24px;
}

/* mix-blend-mode difference makes text invert to black as white bg expands */
.flex__next {
  mix-blend-mode: difference;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.next__txt {
  font-size: 2.5em;
  font-weight: 500;
  line-height: 1.3;
  color: var(--white);
}
```

---

## 12. FOOTER
```
┌─────────────────────────────────────────────────────────┐
│ [TAG]                                                   │
├──────────────────┬─────────────────┬────────────────────┤
│ Menu             │ Social          │ Newsletter         │
│ Work             │ Instagram       │ Subscribe text...  │
│ Exhibitions      │ (X) Twitter     │ [email] [Subscribe]│
│ Stories          │ LinkedIn        │                    │
│ About            │ Behance         │                    │
│ Inquiries        │ Dribbble        │                    │
│ Cookies Policy   │ Patreon         │                    │
│ Privacy Policy   │                 │                    │
├──────────────────┴─────────────────┴────────────────────┤
│ To top        New York & Belgrade      © 2026 Name      │
└─────────────────────────────────────────────────────────┘
```

### CSS
```css
.wrapper__f { padding: 32px 0 20px; }

/* White tag label at top of footer */
.tag {
  background-color: var(--white);
  color: var(--black-2);
  padding: 6px 0 6px 24px;
}
.tag__f { color: var(--black-2); font-size: 0.9em; }
.tag__left { background-color: var(--white); width: 19%; padding: 6px 0; }

/* 3-col footer layout */
.flex__f { display: flex; width: 100%; }
.main_menu { width: 30.5%; margin-right: 6px; }
.newsletter { width: 36%; margin-left: auto; }

.link__footer {
  color: var(--white);
  text-decoration: none;
  display: block;
  font-size: 0.9em;
  padding: 3px 0;
  transition: opacity 0.4s;
}
.link__footer:hover { opacity: 0.55; }

/* Newsletter subscription box */
.subscription__box {
  background-color: var(--white);
  color: var(--black-2);
  margin-top: 6px;
  padding: 16px;
}

.r__subscribe {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 12px;
  position: relative;
}

.field__subscribe {
  background-color: var(--black);
  color: var(--white);
  border: 1px solid transparent;
  min-height: 52px;
  padding: 12px 14px;
  font-size: 0.9em;
  font-family: 'n-c', sans-serif;
  width: 100%;
}

.subscribe__button {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
}

/* Bottom strip */
.flex__last__line { display: flex; justify-content: flex-start; }
.city_copyright { display: flex; justify-content: space-between; width: 35.5%; margin-left: auto; }

.to-top    { font-size: 0.9em; font-weight: 500; color: var(--white); }
.city      { font-size: 0.9em; font-weight: 500; color: var(--white); opacity: 0.55; }
.copyright { font-size: 0.9em; font-weight: 500; color: var(--white); }
```

---

## 13. MOBILE / HAMBURGER MENU

Full-screen overlay menu with large navigation items. Toggled by a Menu/Close button in the header.
```css
/* Full-screen overlay */
.nav__menu {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: var(--black-2);
  display: flex;
  flex-direction: column;
  padding: 80px 24px 40px;
  transform: translateY(-100%);
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav__menu.is-open {
  transform: translateY(0%);
}

/* Large menu links */
.nav__menu a {
  font-family: 'n-c', sans-serif;
  font-size: 5em;
  font-weight: 400;
  color: var(--white);
  text-decoration: none;
  line-height: 1;
  transition: opacity 0.45s, filter 0.45s;
}
.nav__menu a:hover {
  opacity: 0.5;
  filter: blur(2px);
}

/* Social section label */
.nav__menu .social-label {
  font-size: 0.9em;
  font-weight: 500;
  opacity: 0.45;
  margin-top: auto;
  margin-bottom: 12px;
}
```

---

## 14. FORM ELEMENTS

### Input Fields
```css
.field-base {
  color: var(--white);
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.45);
  width: 100%;
  min-height: 48px;
  margin-bottom: 0;
  padding: 10px 16px;
  font-size: 0.9em;
  font-family: 'n-c', sans-serif;
  transition: border-color 0.4s;
}
.field-base:hover,
.field-base:focus {
  border-color: rgba(255, 255, 255, 0.85);
  outline: none;
  background: transparent;
  color: var(--white);
}

.textarea {
  color: var(--white);
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.45);
  width: 100%;
  min-height: 192px;
  font-family: 'n-c', sans-serif;
  transition: border-color 0.4s;
  resize: vertical;
}
.textarea:hover,
.textarea:focus {
  border-color: rgba(255, 255, 255, 0.85);
  outline: none;
}
```

### Filter Pill Labels (Work/Archive page)
```css
.ms-pill-label {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid rgba(241, 241, 241, 0.45);
  border-radius: 0;
  padding: 12px 24px 11px;
  font-size: 0.85em;
  font-weight: 400;
  line-height: 2em;
  white-space: nowrap;
  letter-spacing: 0.01em;
  color: var(--white);
  transition: all 0.45s;
  position: relative;
}
.ms-pill-label:hover {
  border-color: rgba(241, 241, 241, 0.45);
  color: rgb(241, 241, 241);
}