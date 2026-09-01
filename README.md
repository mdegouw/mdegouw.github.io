# mdegouw.nl

Personal portfolio of Mathijs de Gouw. Nuxt 4, statically generated, deployed to
GitHub Pages on a custom domain.

## Quick start

```bash
nvm use          # Node 24 LTS
npm ci
npm run dev      # http://localhost:3000
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run generate` | Static build into `.output/public` (the deploy artefact) |
| `npm run preview` | Serve the generated output locally |
| `npm run lint` / `lint:fix` | ESLint (also the formatter — no Prettier) |
| `npm run typecheck` | `vue-tsc` over the project |
| `npm run test:unit` | Vitest component/unit tests |
| `npm run test:e2e` | Playwright E2E against the generated output |
| `npm run verify` | lint + typecheck + unit — run before committing |

First time running E2E locally:

```bash
npx playwright install
```

## Deployment

Push to `main`. `.github/workflows/ci.yml` runs lint, typecheck and unit tests,
generates the site once, runs Playwright against that exact artefact, then
deploys it to GitHub Pages. Nothing ships unless every gate is green.

The custom domain lives in `public/CNAME` so it survives every build.

## Documentation

- [`CLAUDE.md`](./CLAUDE.md) — architecture, conventions, and the rules any
  contributor (human or agent) works under. Start here.
- [`docs/design-system.md`](./docs/design-system.md) — colour, type, spacing and
  motion tokens.
