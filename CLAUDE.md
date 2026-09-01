# CLAUDE.md

Personal portfolio site for **Mathijs de Gouw** — a statically generated Nuxt 4
site deployed to GitHub Pages at **https://mdegouw.nl**.

Read this file fully before your first edit. It is the contract for how this
codebase is built; where it conflicts with a generic best practice, this file
wins.

---

## 1. Your role

Act as a senior front-end engineer. The owner cares more about **code a human
can still read in two years** than about clever density. Concretely:

- Small, single-purpose components with explicit, typed contracts.
- Names that state intent. No `data`, `item`, `helper`, `utils2`, `handleClick2`.
- Comment the **why**, never the what. If a line needs a "what" comment, rewrite
  the line.
- Delete rather than comment out. Git is the history.
- No speculative abstraction. Extract on the *second* real use, not the first
  imagined one.

---

## 2. Stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | Nuxt 4 (`srcDir: app/`) | Vue 3, `<script setup lang="ts">` only |
| Rendering | **SSG** via `nuxt generate` | No server runtime in production |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | CSS-first config, no `tailwind.config.js` |
| Icons | `@nuxt/icon` (Iconify, `mode: 'svg'`) | Bundled at build, no runtime fetch |
| Fonts | `@nuxt/fonts` | Self-hosted at build time |
| Images | `@nuxt/image` | `<NuxtImg>`/`<NuxtPicture>`, optimised at prerender |
| Theme | `@nuxtjs/color-mode` | `.dark` / `.light` class on `<html>`, dark default |
| SEO | `@nuxtjs/sitemap`, `@nuxtjs/robots` | Generated into the static output |
| Utilities | `@vueuse/nuxt` | Auto-imported; prefer over hand-rolled |
| Lint | ESLint 10 flat config via `@nuxt/eslint` | Stylistic rules on; **no Prettier** |
| Unit tests | Vitest + `@nuxt/test-utils` | `tests/unit/` |
| E2E | Playwright | `tests/e2e/`, runs against generated output |

**No Prettier.** ESLint Stylistic is the single formatter. Do not add Prettier,
`.prettierrc`, or a formatting extension that fights it. Run `npm run lint:fix`.

---

## 3. Commands

```bash
npm run dev            # dev server on :3000
npm run generate       # static build -> .output/public  (this is the deploy artefact)
npm run preview        # serve .output/public locally

npm run lint           # ESLint (cached)
npm run lint:fix       # ESLint autofix — run this before finishing
npm run typecheck      # vue-tsc over the whole project

npm run test:unit      # Vitest, run once
npm run test:unit:watch
npm run test:e2e       # Playwright (generates the site first)
npm run test:e2e:ui    # Playwright interactive mode
npm run test           # unit + e2e

npm run verify         # lint + typecheck + unit — the pre-commit gate
```

**Definition of done for any change:** `npm run verify` passes, and
`npm run test:e2e` passes if you touched markup, routing, or config.

Node 24 LTS (`.nvmrc`). Package manager is **npm** — the lockfile is committed;
do not introduce pnpm/yarn/bun.

---

## 4. Project structure

```
app/                          # Nuxt srcDir — all application code
  app.vue                     # root component (layout + page outlet only)
  assets/css/main.css         # Tailwind entry + design tokens
  components/
    layout/                   # site chrome, one instance each: TheHeader, TheFooter, TheNav
    sections/                 # one file per homepage section: HeroSection, ServicesSection, ...
    ui/                       # generic, content-free primitives: UiButton, UiBadge, UiCard
  composables/                # useX() — auto-imported, reactive logic
  layouts/                    # Nuxt layouts (default.vue)
  types/                      # shared TS types/interfaces
  utils/                      # pure functions — auto-imported, no Vue reactivity
public/                       # served verbatim at the domain root
  CNAME                       # custom domain (mdegouw.nl) — must stay here
  images/                     # source images for <NuxtImg>
tests/
  e2e/                        # Playwright specs (*.spec.ts)
  unit/                       # Vitest specs (*.spec.ts)
docs/                         # design system and longer-form decisions
.github/workflows/ci.yml      # quality -> build -> e2e -> deploy
```

### Component naming — the file name IS the tag name

`components` in `nuxt.config.ts` sets `pathPrefix: false` for every directory.
So `components/ui/UiButton.vue` is `<UiButton>`, full stop. Grep for a tag and
you land on exactly one file.

Because the directory no longer contributes a prefix, **the file name must carry
it**:

| Directory | Naming rule | Example |
| --- | --- | --- |
| `components/ui/` | `Ui` prefix | `UiButton.vue` → `<UiButton>` |
| `components/layout/` | `The` prefix (singleton) | `TheHeader.vue` → `<TheHeader>` |
| `components/sections/` | `Section` suffix | `ExperienceSection.vue` → `<ExperienceSection>` |

Never create two components with the same file name in different directories —
it is a silent resolution conflict.

### Layering rule (enforced by review, not tooling)

```
pages  ->  sections  ->  ui
              |
              +-> composables / utils / types
```

- `ui/` components know **nothing** about the portfolio. No hardcoded copy, no
  "Mathijs", no section-specific spacing. They take props and slots.
- `sections/` own the content and compose `ui/`.
- `ui/` must never import from `sections/`. Sections must never import each other.

### Directories deliberately absent

`app/server/`, `app/middleware/`, `app/plugins/` do not exist. There is no
server at runtime, and a static portfolio needs neither route middleware nor
plugins. Create one only when a concrete need appears — then say why in the PR.

`app/pages/`, by contrast, exists and holds exactly one route — `index.vue`,
which composes the sections from §8 and nothing else.

---

## 5. SSG constraints — read before reaching for a Nuxt feature

The site is prerendered to plain files. There is **no Node process in
production**. This invalidates a lot of standard Nuxt advice:

- ❌ No `server/api/**` routes. Nothing will serve them.
- ❌ No runtime secrets. Every value in the build is public — treat
  `runtimeConfig` as compile-time constants and never put a key there.
- ❌ No dynamic route params resolved at request time. Every route must be
  prerenderable; add it to `nitro.prerender.routes` or make it crawlable from
  `/`.
- ⚠️ `prerender.failOnError: true` is on. A broken internal link fails the
  build. That is intentional — fix the link, do not disable the flag.
- ⚠️ Anything touching `window`/`document` must be inside `onMounted` or
  `<ClientOnly>`. At prerender time there is no DOM, and a crash there breaks
  the deploy, not just one page.
- ✅ Contact form: no backend exists. Use a `mailto:` link or a third-party
  endpoint (Formspree et al.) — ask the owner before adding a third party.

### GitHub Pages specifics

- `nitro.preset: 'github_pages'` emits `.nojekyll` (so `/_nuxt/*` is served) and
  `404.html`. Do not change the preset.
- `public/CNAME` carries the custom domain into the artefact. Deleting it breaks
  the domain.
- The site is at a domain root, so `app.baseURL` stays `/`. If it ever moves to
  `user.github.io/repo`, `baseURL` must change — never hardcode absolute paths
  in markup; use `~/` imports and root-relative `/` URLs.

---

## 6. Coding conventions

### Vue

- `<script setup lang="ts">` always. No Options API, no `defineComponent`.
- Block order is enforced: `<script>`, `<template>`, `<style>`.
- Typed props via the generic form, with defaults:
  ```vue
  <script setup lang="ts">
  interface Props {
    title: string
    variant?: 'primary' | 'ghost'
  }
  const { title, variant = 'primary' } = defineProps<Props>()
  </script>
  ```
- Emits typed the same way: `const emit = defineEmits<{ select: [id: string] }>()`.
- Prefer `computed` over watchers. A `watch` that only derives state is a bug.
- One component per file. If a template exceeds ~150 lines, extract a child.

### TypeScript

- No `any`. Use `unknown` and narrow. No `@ts-ignore` — use `@ts-expect-error`
  with a reason if genuinely unavoidable.
- `import type { Foo } from '...'` for type-only imports. (Not lint-enforced —
  type-aware linting is off for speed — so it is on you.)
- Shared shapes go in `app/types/`. Types used by one component stay in it.

### Tailwind v4

- Configuration is **CSS-first** in `app/assets/css/main.css` via `@theme`.
  There is no `tailwind.config.js` and none should be added.
- Use design tokens, never raw values: `text-accent`, not `text-[#00ff88]`.
  If a value is missing, add a token — that is the signal the design system
  needs it.
- No `@apply` in components. If a utility string repeats, it wants to be a `ui/`
  component, not a CSS alias.
- Order long class lists by concern: layout → box → typography → colour →
  state/variant. Keep it consistent, it makes diffs readable.
- Dark mode is class-based via `@nuxtjs/color-mode` (`classSuffix: ''`). Tailwind
  v4 needs this in `main.css`:
  ```css
  @custom-variant dark (&:where(.dark, .dark *));
  ```

### Accessibility (non-negotiable)

- Semantic landmarks: one `<h1>`, `<nav>`, `<main>`, `<section>` with an
  accessible name, `<footer>`.
- Every interactive element is a real `<button>` or `<a>`. Never a clickable
  `<div>`.
- Visible focus states. Do not remove outlines without replacing them.
- Decorative icons get `aria-hidden="true"`; meaningful ones get a label.
- Respect `prefers-reduced-motion` for every scroll/entrance animation.
- Contrast ≥ 4.5:1 for body text. The design is dark-first — verify, don't guess.

### SEO

- Every page sets `useSeoMeta()` with `title`, `description`, `ogTitle`,
  `ogDescription`, `ogImage`. Site-wide defaults live in `nuxt.config.ts` →
  `app.head`; do not duplicate them per page.
- Anchor navigation uses real `<a href="#services">`, not JS scroll handlers, so
  links work without hydration.

---

## 7. Testing strategy

Two layers, distinct jobs. Do not blur them.

**Vitest (`tests/unit/`)** — logic and component contracts. Fast, no browser.
Test `ui/` primitives (variants render, events emit, props validate),
composables, and utils. Do not snapshot whole sections; snapshots of markup rot
and teach nothing.

```ts
// tests/unit/UiButton.spec.ts
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import UiButton from '~/components/ui/UiButton.vue'

describe('UiButton', () => {
  it('renders its slot content', async () => {
    const wrapper = await mountSuspended(UiButton, { slots: { default: 'Contact' } })
    expect(wrapper.text()).toContain('Contact')
  })
})
```

**Playwright (`tests/e2e/`)** — real browsers against the **generated static
output**, not the dev server. This is the only layer that can catch SSG-specific
failures: hydration mismatches, uncrawled routes, `window`-at-import-time
crashes, missing assets. `tests/e2e/smoke.spec.ts` holds the deployment
contract (200s, hydration without console errors, 404 fallback, robots/sitemap)
— keep it content-agnostic and add a spec per section instead.

Guidelines:
- Select by role or text (`getByRole`, `getByText`), or an explicit
  `data-testid`. Never by Tailwind class — classes are styling, not API.
- Assert user-visible behaviour, not implementation.
- Every new section gets: it renders, its nav anchor scrolls to it, it is usable
  at mobile width.
- E2E serves the artefact on **:4173**, not :3000. That is deliberate: a
  `nuxt dev` server on :3000 would be reused by `reuseExistingServer` and tested
  in place of the artefact, and dev mode's `robots.txt` disables indexing, so
  the smoke spec could never pass. CI always builds fresh.

---

## 8. Design direction

**`docs/design-system.md`** is the complete and authoritative spec — tokens,
component anatomy, per-section layout, motion, accessibility. It is
self-contained; read it before writing any markup. Summary only below.

The archetype is **a systems engineer's terminal**: near-black ground, one
saturated green accent, monospace for anything machine-flavoured, sans for prose,
generous vertical rhythm, hairline-bordered cards with no shadows, and a single
restrained scroll-reveal. Status metaphors carry credibility (`uptime: 5y 4m`
rather than "5 years experience"). Not a startup landing page: no gradients,
no glassmorphism, no stock photography.

Five signature moves carry the identity — mono eyebrow + sans headline on every
section, a terminal prompt line in the hero, status metaphors for numbers,
flat bordered cards, and fade-up-once reveals. Details in the design system.

Sections, top to bottom: Hero → Expertise → Experience → Projects → About →
Contact → Footer. Omit any section that has no real content rather than shipping
filler — a Stack section was specified and then cut for exactly that reason.

**Content lives in the `.vue` files.** No CMS, no `@nuxt/content`, no JSON blobs.
Structured lists (jobs, skills) go in a typed `const` at the top of the section
component that renders them, with the type in `app/types/` if shared. This keeps
copy next to its markup — one file to open to change a section.

---

## 9. Current state

The site is complete and deployable. Header, footer, layout, nine `ui/`
primitives and six sections render at `/`, prerender to `.output/public`, and
pass `npm run verify` plus Playwright on Chromium, Firefox and mobile Chrome.

**The content is real and is the owner's own.** They are a **System / Network
Engineer** who uses programming as scripting inside that role — the site is
written around that and must not drift back into reading like a software
developer's portfolio. Treat every role, date, figure, vendor and project name
in `app/components/sections/` as fact: correct it only when the owner says so,
never to make a sentence scan better.

A Stack section was specified in the design system and built, then cut because
it duplicated what the Expertise and Projects tags already say. `UiStat` went
with it — it had no other consumer. Both are in git if they are ever wanted
back.

Known follow-ups:

- `public/images/og-default.png` is generated with DejaVu standing in for Inter
  and JetBrains Mono. Regenerate with the real faces, and again whenever the
  hero role line changes — the image repeats it.
- WebKit E2E cannot run on this machine — the Playwright browser is installed
  but the host is missing system libraries (`sudo npx playwright install-deps
  webkit`). CI runs all four projects.

### Conventions worth knowing before you edit

- **Durations are not a Tailwind namespace.** v4 has `--ease-*` but no
  `--duration-*`, so `duration-base` generates nothing. Use
  `duration-(--duration-fast)`. See the design system §3.
- **`UiReveal` must never ship hidden content.** The static HTML has no
  `data-reveal` attribute at all; the hidden state is added on mount and only
  for elements still below the fold.
- **`IntersectionObserver` `rootMargin` takes px or %, never rem.** A rem there
  throws at hydration and replaces the whole page with the 500 error.
- **The mobile nav is a native `<dialog>`** opened with `showModal()`, which is
  where its focus trap, Escape handling and focus restoration come from. It
  lives inside `<header>`, so selectors like `header nav a` match it too —
  scope to `nav[aria-label="Sections"]` for the desktop bar.

---

## 10. Working agreements

- **Ask before**: adding a dependency, adding a third-party script or embed,
  changing the deploy pipeline, or introducing a new top-level directory.
- **Never**: commit or push unless asked. Never commit secrets — remember that
  everything in a static build is public.
- Keep changes scoped. One section or one concern per commit; a commit message
  says why, not what.
- If you find something in this file that is now wrong, fix the file in the same
  change that makes it wrong.
