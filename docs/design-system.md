# Design system

The complete visual language for **mdegouw.nl**. This document is
self-contained: everything needed to build the site is specified here, and no
external site or mockup needs to be consulted.

Tokens are applied in `app/assets/css/main.css`. If you deviate in the browser
because it genuinely looks better, update this file in the same change so the
docs stay true.

---

## 1. Art direction

**The archetype:** a systems engineer's terminal. Near-black ground, one
saturated green accent, monospace for anything machine-flavoured, and status
metaphors borrowed from server monitoring. The site should read as though it were
rendered by someone who spends their day in a shell — precise, dense with real
information, no marketing gloss.

**Feels like:** a well-configured status dashboard. Calm, dark, technical,
confident.

**Explicitly not:** a startup landing page. No gradient meshes, no glassmorphism,
no floating 3D blobs, no stock photography of people pointing at whiteboards, no
"Trusted by 10,000+ teams" social-proof theatre.

### The five signature moves

These are what make the design recognisable. Use all five; they carry the
identity.

1. **Mono eyebrow + sans headline.** Every section opens with a small uppercase
   monospace label in accent green, then a large sans-serif headline beneath it.
   This pairing is the single most repeated element on the site.
2. **Terminal prompt in the hero.** A `mathijs@mdegouw:~$` line rendered in mono,
   with the tagline as the "command output" beneath it. Sets the tone in the
   first 200px.
3. **Status metaphors for credibility.** Instead of "5 years experience", show
   `uptime: 5y 4m`. Instead of "available for work", a pulsing green dot with
   `status: available`. Numbers in mono, always.
4. **Hairline-bordered cards on a flat ground.** No shadows. Depth comes from a
   one-pixel border and a very slightly lighter surface.
5. **Restrained scroll reveal.** Content fades up 12px, once, as it enters view.
   Nothing else moves.

### Voice

First person, plain, specific. Short sentences. Technical nouns are welcome —
the audience is technical. State what you did and what it ran on. Avoid
"passionate", "innovative", "cutting-edge", "solutions", and any sentence that
would survive being deleted.

---

## 2. Principles

1. **Dark-first.** Near-black ground, one saturated accent, everything else
   greyscale. Light mode is a supported inversion, not the primary design.
2. **One accent, used sparingly.** The accent marks *action and status* only —
   links, CTAs, active nav, live indicators, section eyebrows. If everything is
   accent, nothing is. Target: under 10% of any viewport is accent-coloured.
3. **Monospace as signal.** Mono is for machine-flavoured content: labels,
   metadata, tags, stats, timestamps, the terminal prompt. Prose is sans.
   Never set body paragraphs in mono.
4. **Space over lines.** Separate sections with vertical rhythm before reaching
   for a border. One hairline is worth more than three.
5. **Motion is confirmation, not decoration.** Short, subtle, once. Fully
   disabled under `prefers-reduced-motion`.
6. **Flat, not floating.** No `box-shadow` anywhere. Elevation is communicated by
   surface lightness and borders.

---

## 3. Tokens

Tailwind v4 is configured CSS-first. This is the full contents of
`app/assets/css/main.css`:

```css
@import "tailwindcss";

/* @nuxtjs/color-mode is configured with `classSuffix: ''`, so it toggles a
   `.dark` / `.light` class on <html>. Tailwind v4 needs to be told that. */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* ---- Surfaces (dark is the default palette) ---------------------------- */
  --color-ground:      #08090a;  /* page background */
  --color-surface:     #101214;  /* cards, raised panels */
  --color-surface-alt: #171a1d;  /* hover / nested panels */
  --color-line:        #24282c;  /* hairline borders */
  --color-line-strong: #333940;  /* hovered/focused borders */

  /* ---- Text ------------------------------------------------------------- */
  --color-ink:         #e8eaed;  /* primary text */
  --color-ink-muted:   #9aa2aa;  /* secondary text, body copy */
  --color-ink-subtle:  #5f676e;  /* metadata, disabled, large text only */

  /* ---- Accent ----------------------------------------------------------- */
  --color-accent:      #3ddc84;  /* terminal green — actions, links, status */
  --color-accent-dim:  #2aa563;  /* hover/pressed */
  --color-accent-wash: #3ddc841a; /* 10% tint for backgrounds */

  /* ---- Status ----------------------------------------------------------- */
  --color-positive:    #3ddc84;
  --color-warning:     #e3b341;
  --color-critical:    #f2555a;

  /* ---- Typography ------------------------------------------------------- */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", monospace;

  /* Fluid display sizes: readable on mobile, commanding on desktop. */
  --text-display:   clamp(2.5rem, 6vw, 4.5rem);
  --text-headline:  clamp(1.75rem, 3.5vw, 2.5rem);
  --text-title:     clamp(1.125rem, 1.6vw, 1.375rem);
  --text-label:     0.75rem;   /* mono, uppercase, tracked */

  /* ---- Rhythm ----------------------------------------------------------- */
  --spacing-section: clamp(4rem, 10vh, 8rem);  /* vertical padding per section */
  --container-content: 72rem;                   /* max readable width */

  /* ---- Form ------------------------------------------------------------- */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;

  /* ---- Motion ----------------------------------------------------------- */
  --ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 150ms;
  --duration-base: 300ms;

  /* The two infinite animations. Everything else moves once, or not at all. */
  --animate-status-pulse: status-pulse 2s ease-in-out infinite;
  --animate-cursor-blink: cursor-blink 1s step-end infinite;

  @keyframes status-pulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.4; }
  }

  @keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0; }
  }
}

/* Light mode inverts surfaces and darkens the accent for contrast. */
:root.light {
  --color-ground:      #fbfbfa;
  --color-surface:     #ffffff;
  --color-surface-alt: #f2f3f4;
  --color-line:        #e2e4e6;
  --color-line-strong: #cdd1d5;
  --color-ink:         #14171a;
  --color-ink-muted:   #4d555c;
  --color-ink-subtle:  #7b838a;
  --color-accent:      #10883f;  /* darker: 4.5:1 on white */
  --color-accent-dim:  #0b6a30;
  --color-accent-wash: #10883f1a;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-ground);
  color: var(--color-ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

/* Anchor targets must clear the sticky header. */
[id] {
  scroll-margin-top: 5rem;
}

/* Scroll reveal. The prerendered HTML carries no `data-reveal` attribute at
   all, so content is visible with JS disabled or before hydration; UiReveal
   only adds "hidden" once it is mounted and able to remove it again. */
[data-reveal] {
  transition:
    opacity var(--duration-base) var(--ease-out-soft),
    transform var(--duration-base) var(--ease-out-soft);
}

[data-reveal="hidden"] {
  opacity: 0;
  transform: translateY(12px);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
  }
}
```

Fonts are declared by name only — `@nuxt/fonts` resolves, downloads and
self-hosts them at build time. No `<link>` to a font CDN.

### Token → utility mapping

Tailwind v4 turns each `@theme` namespace into real utilities, so use those
names directly — never arbitrary-value syntax for a token that already exists:

| Token | Utility |
| --- | --- |
| `--color-ground` | `bg-ground`, `text-ground`, `border-ground` |
| `--color-ink-muted` | `text-ink-muted` |
| `--text-display` | `text-display` |
| `--font-mono` | `font-mono` |
| `--spacing-section` | `py-section`, `mt-section` |
| `--container-content` | `max-w-content` |
| `--radius-md` | `rounded-md` (overrides the Tailwind default) |
| `--ease-out-soft` | `ease-out-soft` |
| `--duration-base` | `duration-(--duration-base)` — see below |
| `--animate-status-pulse` | `animate-status-pulse` |

**Durations are the one exception.** Tailwind v4 has no `--duration-*` theme
namespace — `duration-base` would silently generate nothing. Use v4's
CSS-variable shorthand instead, which is still the token and not a raw value:

```html
<div class="transition-colors duration-(--duration-fast)">
```

### Colour usage rules

| Token | Use for | Never use for |
| --- | --- | --- |
| `ground` | page background, sticky header | cards |
| `surface` | cards, panels, code blocks | page background |
| `line` | all hairline borders | text |
| `ink` | headings, emphasised text | long body copy |
| `ink-muted` | body copy, descriptions | headings |
| `ink-subtle` | timestamps, tags, captions | anything below 14px |
| `accent` | links, CTAs, eyebrows, status | body text, large fills |
| `accent-wash` | tag/badge backgrounds | text colour |

### Contrast check (dark palette)

| Pair | Ratio | Verdict |
| --- | --- | --- |
| `ink` on `ground` | ~15:1 | ✅ |
| `ink-muted` on `ground` | ~7:1 | ✅ body-safe |
| `ink-subtle` on `ground` | ~4.0:1 | ⚠️ large text / metadata only |
| `ink-subtle` on `surface` | ~3.7:1 | ⚠️ non-text and large text only |
| `accent` on `ground` | ~11:1 | ✅ |
| `ground` on `accent` (filled button) | ~11:1 | ✅ |

Re-verify with a contrast tool after any colour change; do not trust these
numbers if you edit the hexes.

---

## 4. Typography

| Role | Size token | Family | Treatment |
| --- | --- | --- | --- |
| Hero name | `text-display` | sans | `font-semibold`, `tracking-tight`, `leading-[1.05]` |
| Section heading | `text-headline` | sans | `font-semibold`, `tracking-tight` |
| Card / item title | `text-title` | sans | `font-medium` |
| Body | `text-base` → `text-lg` | sans | `text-ink-muted`, `leading-relaxed`, `max-w-[65ch]` |
| Eyebrow / section label | `text-label` | **mono** | uppercase, `tracking-[0.15em]`, `text-accent` |
| Tags, stats, metadata | `text-sm` | **mono** | `text-ink-subtle` |
| Terminal prompt | `text-sm` → `text-base` | **mono** | `text-accent` for prompt, `text-ink` for output |

Rules:

- Exactly **one `<h1>`** per page — the hero name. Section headings are `<h2>`,
  card titles `<h3>`. Never pick a heading level for its size; use classes.
- Body copy is capped at `65ch` regardless of container width.
- Numbers that represent measurements, dates or counts are always mono. Mixing a
  mono figure into a sans sentence is fine and intentional.
- No text below `0.75rem`. No justified text. No `text-transform: uppercase` on
  anything longer than four words.

---

## 5. Layout & grid

- **Container:** single column, `max-w-content` (72rem),
  centred, `px-6` at mobile / `px-8` from `md`.
- **Section rhythm:** every section gets `py-section`. This is the
  only vertical spacing that separates sections — no dividers by default.
- **Section separator:** where two adjacent sections both use `surface` cards and
  need visual separation, add a single `border-t border-line` to the second. Use
  sparingly.
- **Breakpoints** (Tailwind defaults, mobile-first): `sm 640`, `md 768`,
  `lg 1024`, `xl 1280`, `2xl 1536`.

### Grid columns per pattern

| Pattern | mobile | `md` | `lg` |
| --- | --- | --- | --- |
| Service / expertise cards | 1 | 2 | 3 |
| Project cards | 1 | 2 | 2 |
| Logo grid | 2 | 3 | 4 |
| Experience timeline | 1 | 1 | 1 (single column always) |
| Footer columns | 1 | 3 | 3 |

Gap is `gap-4` at mobile, `gap-6` from `md`.

### Sticky header

- `position: sticky; top: 0`, `z-50`, height `4rem`.
- Background `ground` at 80% opacity with `backdrop-blur-md`.
- **No bottom border until scrolled.** Add `border-b border-line` once
  `window.scrollY > 8` (VueUse `useWindowScroll`). This is the only chrome that
  reacts to scroll position.
- Left: mono wordmark (`mdegouw.nl` or `~/mathijs`). Right: anchor nav.
- Nav links: `text-sm`, `text-ink-muted`, `hover:text-ink`. The section currently
  in view gets `text-accent` (VueUse `useIntersectionObserver` on section ids).
- Below `md`: nav collapses to a hamburger opening a full-screen `ground` overlay
  with large mono links. Trap focus while open, close on `Escape` and on
  navigation. Implemented as a native `<dialog>` opened with
  `showModal()`: the platform supplies the focus trap, the inert background,
  Escape-to-close and focus restoration, all four of which are easy to hand-roll
  wrongly.

---

## 6. Component anatomy

Build these as `ui/` primitives. Section components must not re-implement them.

### `UiSection`

The wrapper every section uses. Renders a semantic `<section>` with an `id`
(anchor target), `py-section`, and a centred container.

- Props: `id` (required), `label` (eyebrow text), `heading`, `lead`.
- Slots: `default`, plus optional `heading` / `lead` overrides.
- Must set `aria-labelledby` pointing at its heading so the section has an
  accessible name.

### `UiSectionHeading`

The mono eyebrow + sans headline pair from §1. Stacked, `gap-3`, left-aligned.
Optional `lead` paragraph beneath in `ink-muted`, capped at `65ch`.

### `UiCard`

- Base: `bg-surface`, `border border-line`, `rounded-md`, `p-6`.
- Hover: `border-line-strong`, `bg-surface-alt`. Transition `--duration-fast` on
  `background-color` and `border-color` only — **the card must not move or
  scale**.
- Optional accent top-border variant for emphasis: `border-t-2 border-t-accent`.
- Renders as `<article>` when it represents a discrete item.

### `UiTag`

Small mono pill for skills and technologies.

- `text-xs font-mono`, `px-2 py-0.5`, `rounded-sm`.
- `bg-accent-wash text-accent` for primary skills; `bg-surface-alt
  text-ink-subtle border border-line` for secondary ones.
- Non-interactive. If a tag is clickable, it is a `UiButton`, not a tag.

### `UiButton`

- Renders `<a>` when given `href`, `<button type="button">` otherwise. Never a
  `<div>`.
- Variants:
  - `primary` — `bg-accent text-ground font-medium`, `hover:bg-accent-dim`.
  - `ghost` — `border border-line text-ink`, `hover:border-line-strong
    hover:bg-surface`.
- Shared: `rounded-sm`, `px-5 py-2.5`, `text-sm`, transition
  `--duration-fast`.
- Focus: `focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-accent`. Never remove it.
- Minimum hit area 44×44px including padding.

### `UiTimelineItem`

One dated entry in the Experience list.

- Two-column at `md`+: fixed `10rem` mono date column left, content right.
  Single column stacked at mobile with the date above as a mono line.
- A `1px` `line` vertical connector runs down the left edge through all items,
  with a `6px` accent dot at each entry. The connector stops at the last item —
  it must not dangle.
- Content: role title (`text-title`), organisation (`text-ink-muted`), then a
  short description and `UiTag`s.

### `UiStatusDot`

- `6px` circle, `bg-accent`, with a slow pulse (`opacity` 1 → 0.4 → 1 over 2s,
  `ease-in-out`, infinite). Pulse is the one exception to "motion once" — it
  communicates liveness.
- Always paired with mono text (`status: available`). Never a bare dot.
- `aria-hidden="true"`; the adjacent text carries the meaning.

### `UiTerminalLine`

The hero prompt.

- Structure: `user@host` in `accent`, `:~$` in `ink-subtle`, command in `ink`.
- Optional blinking block cursor (`▋`) at the end, `1s` step-end animation.
- Renders as a `<p>`, not a fake terminal window with chrome. One line, not a box.

### `UiReveal`

The scroll-reveal wrapper from §8. Wraps a block and fades it up once.

- Props: `delay` (ms, for grid stagger), `as` (root tag, so it can be an `<li>`
  inside a list without breaking the markup).
- **Ships nothing hidden.** The prerendered HTML carries no `data-reveal`
  attribute, so content is visible before hydration and with JS off. Only on
  mount does it add `data-reveal="hidden"`, and only for elements that are still
  below the fold — anything already painted on screen skips the hidden state
  entirely, or it would visibly blink out and fade back in.
- Stops observing after the first reveal.

---

## 7. Page composition

Single route (`/`) with anchored sections, in this order. Each is one component
in `app/components/sections/`.

| # | Section | id | Contents & layout |
| --- | --- | --- | --- |
| 1 | Hero | `top` | `UiTerminalLine`, `<h1>` name at `text-display`, role line in `ink-muted`, one-sentence positioning statement, `UiStatusDot` availability line, primary + ghost CTA pair. Full viewport height at `md`+ (`min-h-[85svh]`), left-aligned, vertically centred. A mono scroll hint sits at the bottom edge. |
| 2 | Expertise | `expertise` | 3-column `UiCard` grid. Each card: icon, `<h3>` title, two-line description, row of `UiTag`s. Aim for 6 cards — a 2×3 block reads as deliberate. |
| 3 | Experience | `experience` | `UiTimelineItem` list, newest first. Single column. |
| 4 | Projects | `projects` | 2-column `UiCard` grid. Each: title, what it does in one line, `UiTag`s for the technologies, optional repo/live links. |
| 5 | About | `about` | Two columns at `lg`: prose left (capped `65ch`), a mono "spec sheet" panel right — key/value pairs like `location`, `focus`, `languages`, styled as a `surface` card. Prose is first in DOM order. |
| 6 | Contact | `contact` | Email as a large mono `mailto:` link, availability line with `UiStatusDot`, expected response time, social links. Centred, narrower container (`max-w-2xl`). |
| 7 | Footer | — | Three columns at `md`: wordmark + one-line description, nav anchors, social/external links. Below: `border-t border-line`, copyright and a mono build line. |

Notes:

- **Anchor navigation uses real `<a href="#expertise">`.** No JS scroll handlers
  — links must work before hydration and with JS disabled.
- Sections alternate nothing. There is no striped background; the ground stays
  constant and cards provide the only surface variation.
- If a section has no real content yet, **omit it** rather than shipping a
  placeholder. An honest six-section site beats an eight-section one with filler.

### Content lives in the `.vue` files

No CMS, no `@nuxt/content`, no JSON. Structured lists (roles, skills, projects)
go in a typed `const` at the top of the section component that renders them, with
the type in `app/types/` if it is shared. One file to open to change a section.

---

## 8. Motion

| Element | Animation | Duration | Easing |
| --- | --- | --- | --- |
| Section / card reveal | fade `0→1` + `translateY(12px→0)` | `--duration-base` | `--ease-out-soft` |
| Hover (colour, border) | colour transition only | `--duration-fast` | default |
| Mobile nav overlay | fade + `translateY(-8px)` | `--duration-fast` | `--ease-out-soft` |
| Status dot | opacity pulse, infinite | `2s` | `ease-in-out` |
| Terminal cursor | opacity blink, infinite | `1s` | `step-end` |

Rules:

- Reveal fires **once**, via VueUse `useIntersectionObserver` at ~15% visibility.
  Never re-animate on scroll-back — it makes the page feel unstable.
- Stagger items within a grid by no more than `60ms` each, and cap the total
  stagger at `300ms`.
- **Nothing moves on hover.** No lift, no scale, no translate. Colour and border
  only.
- Reveal animations must start from a *visible* state in the prerendered HTML, or
  be applied by a class added on mount. If JS never runs, all content must still
  be visible — never ship `opacity: 0` as the static default.
- Everything except the two infinite pulses is disabled by the
  `prefers-reduced-motion` block in §3. Verify with the OS setting on.

---

## 9. Iconography & imagery

- Icons via `<Icon name="lucide:..." />`. Pick **one** Iconify collection —
  `lucide` — and stay in it. Mixed icon sets read as sloppy.
- Icon sizing: `size-5` inline with text, `size-6` in card headers. Stroke
  weight stays at the collection default; never mix filled and outlined.
- Decorative icons get `aria-hidden="true"`. Meaningful ones get an
  `aria-label`.
- Photos through `<NuxtImg>` with explicit `width`/`height` (prevents layout
  shift) and `loading="lazy"` below the fold. Source files in `public/images/`.
- The design needs almost no imagery: at most one portrait in About. Resist
  adding decorative images — empty space is the aesthetic.
- **Required before launch:** `public/images/og-default.png` at 1200×630. Links
  to the site currently preview blank. Match the site's look — dark ground, mono
  wordmark, accent rule.

---

## 10. Accessibility

Non-negotiable, and cheaper to build in than to retrofit:

- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, one `<h1>`, each
  `<section>` with an accessible name via `aria-labelledby`.
- A skip link to `#main` as the first focusable element, visible on focus.
- Every interactive element is a real `<button>` or `<a>`. Never a clickable
  `<div>`.
- Visible `focus-visible` rings on the accent colour, `2px` with `2px` offset.
  Do not remove an outline without replacing it.
- The mobile nav overlay traps focus, closes on `Escape`, and returns focus to
  the trigger.
- Full keyboard pass required: tab through the whole page and confirm order
  matches visual order, nothing is reachable-but-invisible, and nothing traps.
- Colour is never the only signal. The active nav item gets weight or an
  underline in addition to `accent`.
- Respect `prefers-reduced-motion` for every animation.

---

## 11. Do / don't

**Do**
- Use tokens (`text-accent`), never raw values (`text-[#3ddc84]`). A missing
  value means the system needs a new token.
- Build a `ui/` component when a utility string repeats. Not an `@apply` alias.
- Keep class lists ordered: layout → box → typography → colour → state.
- Show real numbers, real stack names, real dates.

**Don't**
- No `box-shadow`. No gradients except the `accent-wash` tint.
- No `@apply` in components.
- No second accent colour. If something needs to stand out from the accent, use
  weight or space.
- No animated counters, marquees, particle backgrounds, or typewriter effects
  beyond the single hero prompt.
- No placeholder copy, lorem ipsum, or invented client logos in a commit.
