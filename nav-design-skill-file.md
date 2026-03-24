# 🧭 Navigation Design Skill File
## Source: skvarenina.com | Style: Expanding Pill / Floating Drawer Nav

---

## 1. CONCEPT & BEHAVIOR OVERVIEW

This navigation is a **centered floating pill** fixed at the top of the viewport. In its **collapsed state**, it shows only a logo and a "four-dot grid" toggle icon. When hovered (or clicked), it **vertically expands** like a drawer to full height, revealing nav links and a CTA button at the bottom. The animation is driven by Framer Motion and uses CSS variant classes to swap between states.

**Interaction Flow:**
- Default: Compact pill (54px tall, 358px wide) — shows logo + dots icon
- Hover / Click → Expanded state (680px tall, 360px wide) — reveals nav items + CTA
- The pill **always stays centered** horizontally via `position: fixed` + `left: 50%` + `transform: translateX(-50%)`
- The "dots" icon animates from a 2×2 grid → to 2 side-by-side dots (open state indicator)

---

## 2. COLOR TOKENS

These are the exact design tokens from the site's CSS:

```css
:root {
  --color-bg-page:        #0c0c0c;   /* Near-black page background */
  --color-surface-dark:   #1f1f1f;   /* Dark card/panel surface */
  --color-surface-medium: #181818;   /* Slightly lighter surface */
  --color-text-primary:   #ffffff;   /* Primary white text */
  --color-text-muted:     #7a7a7a;   /* Muted gray (used for index numbers) */
  --color-text-dimmed:    #8f8f8f;   /* Slightly lighter muted */
  --color-accent-pink:    #ff76a2;   /* Brand accent / highlight color */

  /* Nav pill glass background */
  --color-nav-glass-bg:   rgba(61, 61, 61, 0.4);
  --color-nav-header-bg:  rgba(255, 255, 255, 0.2); /* Inner pill header strip */
}
```

---

## 3. TYPOGRAPHY

**Primary Font: Saans** (variable font, used throughout the nav)

```css
/* Regular weight */
@font-face {
  font-family: "Saans Regular";
  src: url("https://framerusercontent.com/assets/OxeBY6UTBDrdVkYpbWOTAOONI.woff2");
  font-style: normal;
  font-weight: 380;
}

/* Medium weight */
@font-face {
  font-family: "Saans Medium";
  src: url("https://framerusercontent.com/assets/ql7WEctRB3a8uNodtQppYLb62I.woff2");
  font-style: normal;
  font-weight: 570;
}
```

**Nav Item Text Styles:**

| Element | Font | Size | Weight | Color | Letter Spacing |
|---|---|---|---|---|---|
| Nav items (HOME, etc.) | Saans Medium | 36px | 570 | `#ffffff` | 0em |
| Index numbers (01, 02…) | Saans Regular | 20px | 380 | `#7a7a7a` | 0em |
| Logo wordmark | Saans Medium | ~15px | 570 | `#ffffff` | wide (uppercase) |
| CTA "BOOK INTRO CALL" | Saans Medium | 36px | 570 | `#ffffff` | 0em |

**OpenType Features used:** `'blwf', 'cv09', 'cv03', 'cv04', 'cv11'` (all on)

---

## 4. LAYOUT STRUCTURE

```
FIXED WRAPPER (.nav-fixed-wrapper)
└── NAV PILL CONTAINER (.nav-pill)           ← overflow: clip, border-radius: 20px
    ├── GLASS BACKGROUND (.nav-glass-bg)     ← absolute, full size, backdrop-filter
    ├── HEADER BAR (.nav-header)             ← z-index: 2, top row (logo + toggle)
    │   ├── LOGO LINK (.nav-logo)            ← img, 190px wide
    │   └── DOTS TOGGLE (.nav-dots)          ← 22×22px, 4 white circles animating
    ├── NAV ITEMS LIST (.nav-links)          ← z-index: 1, column flex
    │   ├── NAV ITEM (.nav-item)             ← link + number side by side
    │   │   ├── TEXT ("HOME")
    │   │   ├── UNDERLINE (.nav-underline)   ← grows on hover
    │   │   └── NUMBER ("01")
    │   ├── NAV ITEM ("CASE STUDIES / 02")
    │   └── NAV ITEM ("ABOUT ME / 03")
    └── CTA SECTION (.nav-cta)              ← bottom, same style as nav item
        └── NAV ITEM ("BOOK INTRO CALL")
```

---

## 5. NAV PILL — CORE CSS

### Fixed Wrapper (centers the pill)

```css
.nav-fixed-wrapper {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; /* allows click-through to page */
}
```

### Pill Container

```css
.nav-pill {
  pointer-events: all;
  position: relative;
  border-radius: 20px;
  overflow: clip;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;

  /* COLLAPSED STATE */
  width: 358px;
  height: 54px;
  cursor: pointer;

  /* SMOOTH EXPAND */
  transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              width  0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: height, width;
}

/* EXPANDED STATE (on hover or .is-open class) */
.nav-pill:hover,
.nav-pill.is-open {
  height: 680px;       /* or min-height: calc(85vh) */
  min-height: calc(var(--vh, 1vh) * 85);
  width: 360px;
  justify-content: space-between;
  cursor: default;
}
```

---

## 6. GLASS BACKGROUND LAYER

This is the frosted glass effect that fills the entire pill:

```css
.nav-glass-bg {
  position: absolute;
  inset: 0;                              /* top: 0, right: 0, bottom: 0, left: 0 */
  z-index: 0;
  border-radius: inherit;
  background-color: rgba(61, 61, 61, 0.4);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
}
```

---

## 7. HEADER BAR (Logo + Toggle)

```css
/* Inner pill strip that houses logo + dots */
.nav-header-strip {
  position: absolute;
  top: 6px;
  left: 1.5%;
  width: 97%;
  height: 50px;   /* 44px collapsed, 50px expanded */
  z-index: 2;
  overflow: hidden;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.20); /* subtle white frost on top bar */
}

/* Actual header flex row inside the strip */
.nav-header {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: min-content;
}

/* Logo */
.nav-logo {
  display: block;
  width: 190px;
  height: 15px;    /* 18px on desktop */
  object-fit: contain;
  object-position: left center;
}

/* Dots Toggle Button */
.nav-dots-btn {
  width: 22px;
  height: 22px;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
}
```

---

## 8. DOTS TOGGLE ICON (2×2 Grid → 2 Dots Animation)

The toggle icon has **6 white circles** (7px × 7px each, `border-radius: 50%`). In the **closed** state they sit at the four corners + 2 center positions = horizontal "··" pattern. In the **open** state all 4 corners collapse to center and only the 2 center dots remain visible at left and right.

```css
/* All dot circles */
.nav-dot {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #ffffff;
  transition: top 0.3s ease, left 0.3s ease, right 0.3s ease, bottom 0.3s ease;
}

/* CLOSED state — corner positions */
.nav-dot.top-left     { top: 0;    left: 0;    }
.nav-dot.bottom-left  { bottom: 0; left: 0;    }
.nav-dot.top-right    { top: 0;    right: 0;   }
.nav-dot.bottom-right { bottom: 0; right: 0;   }
.nav-dot.center-left  { top: 50%;  left: 50%;  }  /* hidden / same pos as center */
.nav-dot.center-right { top: 50%;  left: 50%;  }

/* OPEN state — all 4 corners collapse to center, 2 dots spread */
.nav-pill.is-open .nav-dot.top-left     { top: 50%; left: 50%; }
.nav-pill.is-open .nav-dot.bottom-left  { top: 50%; left: 50%; }
.nav-pill.is-open .nav-dot.top-right    { top: 50%; left: 50%; }
.nav-pill.is-open .nav-dot.bottom-right { top: 50%; left: 50%; }
.nav-pill.is-open .nav-dot.center-left  { top: 50%; left: 0;   }
.nav-pill.is-open .nav-dot.center-right { top: 50%; right: 0; left: unset; }
```

---

## 9. NAV LINKS LIST

```css
.nav-links {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;           /* 6px tablet, 10px desktop */
  width: 100%;
  height: min-content;

  /* Hidden in collapsed state */
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease 0.1s;
}

.nav-pill.is-open .nav-links {
  opacity: 1;
  pointer-events: all;
}
```

### Individual Nav Item

```css
.nav-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  overflow: clip;
  width: min-content;
  height: min-content;
}

/* The large nav label text */
.nav-item-label {
  font-family: "Saans Medium", sans-serif;
  font-size: 36px;
  font-weight: 570;
  color: #ffffff;
  white-space: pre;
  letter-spacing: 0em;
  line-height: 1.05;
  font-feature-settings: 'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on;
}

/* The numbered index beside each link */
.nav-item-number {
  font-family: "Saans Regular", sans-serif;
  font-size: 20px;
  font-weight: 380;
  color: #7a7a7a;
  white-space: pre;
  line-height: 24px;
  align-self: flex-start;  /* sits at top of the item */
  margin-top: 2px;
}

/* Animated underline — grows on hover */
.nav-item-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1%;    /* starts tiny */
  height: 1px;
  background-color: #ffffff;
  z-index: 1;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover .nav-item-underline {
  width: 100%;  /* expands to full width on hover */
}
```

---

## 10. CTA BUTTON (Bottom of Nav)

The CTA "BOOK INTRO CALL" uses the exact same `.nav-item` style as the nav links — no special button styling. It's just another large text link at the bottom with the same underline hover effect. It's separated from the nav links via `justify-content: space-between` on the pill.

```css
.nav-cta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* CTA inherits .nav-item styles */
.nav-cta .nav-item-label {
  font-size: 36px; /* same size as nav links */
  color: #ffffff;
}
```

---

## 11. RESPONSIVE VARIANTS

| Breakpoint | Pill Width | Pill Height (expanded) | Notes |
|---|---|---|---|
| Mobile `< 810px` | 360px | 680px (min 85vh) | Current visible state |
| Tablet `810–1199px` | 460px | ~95vh | Wider pill |
| Desktop `≥ 1200px` | 400px | 56px collapsed | Logo 186px wide |

```css
/* Tablet */
@media (min-width: 810px) and (max-width: 1199px) {
  .nav-pill.is-open {
    width: 460px;
    min-height: calc(var(--vh, 1vh) * 95);
  }
  .nav-links { gap: 6px; }
}

/* Desktop */
@media (min-width: 1200px) {
  .nav-pill {
    width: 400px;
    height: 56px;
    padding: 16px;
  }
  .nav-pill.is-open {
    width: 400px;
  }
  .nav-logo {
    width: 186px;
    height: 15px;
  }
  .nav-links { gap: 10px; }
}
```

---

## 12. HTML TEMPLATE (Ready to Use)

```html
<div class="nav-fixed-wrapper">
  <nav class="nav-pill" id="nav-pill">

    <!-- Glass Background -->
    <div class="nav-glass-bg" aria-hidden="true"></div>

    <!-- White inner pill strip -->
    <div class="nav-header-strip" aria-hidden="true"></div>

    <!-- Header Row: Logo + Toggle -->
    <div class="nav-header" id="nav-toggle">
      <a href="/" class="nav-logo-link">
        <img src="YOUR-LOGO.svg" alt="YourBrand" class="nav-logo" />
      </a>
      <button class="nav-dots-btn" aria-label="Toggle menu" aria-expanded="false">
        <div class="nav-dot top-left"></div>
        <div class="nav-dot bottom-left"></div>
        <div class="nav-dot top-right"></div>
        <div class="nav-dot bottom-right"></div>
        <div class="nav-dot center-left"></div>
        <div class="nav-dot center-right"></div>
      </button>
    </div>

    <!-- Nav Links -->
    <ul class="nav-links" role="navigation">
      <li>
        <a href="/" class="nav-item">
          <span class="nav-item-label">HOME</span>
          <span class="nav-item-number">01</span>
          <span class="nav-item-underline" aria-hidden="true"></span>
        </a>
      </li>
      <li>
        <a href="/work" class="nav-item">
          <span class="nav-item-label">OUR WORK</span>
          <span class="nav-item-number">02</span>
          <span class="nav-item-underline" aria-hidden="true"></span>
        </a>
      </li>
      <li>
        <a href="/about" class="nav-item">
          <span class="nav-item-label">ABOUT</span>
          <span class="nav-item-number">03</span>
          <span class="nav-item-underline" aria-hidden="true"></span>
        </a>
      </li>
    </ul>

    <!-- CTA at bottom -->
    <div class="nav-cta">
      <a href="/contact" class="nav-item">
        <span class="nav-item-label">GET IN TOUCH</span>
        <span class="nav-item-underline" aria-hidden="true"></span>
      </a>
    </div>

  </nav>
</div>
```

---

## 13. JAVASCRIPT (Toggle Logic)

```javascript
const pill    = document.getElementById('nav-pill');
const toggle  = document.getElementById('nav-toggle');
const dotsBtn = pill.querySelector('.nav-dots-btn');

// Open on hover (desktop)
pill.addEventListener('mouseenter', () => openNav());
pill.addEventListener('mouseleave', () => closeNav());

// Toggle on click (mobile)
toggle.addEventListener('click', (e) => {
  e.stopPropagation();
  pill.classList.contains('is-open') ? closeNav() : openNav();
});

function openNav() {
  pill.classList.add('is-open');
  dotsBtn.setAttribute('aria-expanded', 'true');
}

function closeNav() {
  pill.classList.remove('is-open');
  dotsBtn.setAttribute('aria-expanded', 'false');
}

// Close on outside click
document.addEventListener('click', (e) => {
  if (!pill.contains(e.target)) closeNav();
});
```

---

## 14. KEY DESIGN PRINCIPLES OBSERVED

1. **Pill-in-pill** — The nav has two rounded layers: the outer pill (dark glass, `border-radius: 20px`) and an inner top-strip (`border-radius: 16px`) with a lighter semi-transparent background that holds just the logo and toggle.

2. **Glass morphism** — `backdrop-filter: blur(30px)` on dark `rgba(61, 61, 61, 0.4)` background. No `border` or `box-shadow` — the frosted glass is the only separation from the content behind.

3. **Oversized typography as navigation** — Nav items are huge (36px) and all-caps. This is the design's main statement. No icons, no hover color changes — just a white underline growing from left.

4. **Number tags as secondary info** — The `01`, `02`, `03` numbering in muted gray sits top-aligned beside each large item and gives order/structure without competing.

5. **The CTA is just another nav item** — No button background, no border-radius. Just the same giant text at the very bottom of the expanded pill, separated by whitespace via `justify-content: space-between`.

6. **Centered & fixed** — Nav stays centered at all times via `position: fixed; left: 50%; transform: translateX(-50%)`.

7. **The dots icon is a state communicator** — In closed state it's a 2×2 dot grid (suggesting expandability). In open state all dots collapse inward to two center dots (suggesting closability).

---

## 15. QUICK REFERENCE CHEAT SHEET

| Property | Value |
|---|---|
| Pill border-radius | `20px` |
| Inner strip border-radius | `16px` |
| Glass bg color | `rgba(61, 61, 61, 0.4)` |
| Header strip bg | `rgba(255, 255, 255, 0.2)` |
| Backdrop blur | `blur(30px)` |
| Pill padding | `20px` |
| Collapsed size | `358 × 54px` |
| Expanded size | `360 × 680px` |
| Nav font | Saans Medium, 36px, weight 570 |
| Number font | Saans Regular, 20px, weight 380 |
| Number color | `#7a7a7a` |
| Underline height | `1px`, white, grows left→right |
| Dot icon size | `22 × 22px` container, 6× `7px` dots |
| z-index | `10` |
| Transition | `height 0.5s`, `width 0.4s` cubic-bezier |

---

*File created: March 2026 | Reverse-engineered from skvarenina.com*
