import { readFileSync } from 'node:fs'
import { addServerPlugin, addTemplate } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'

// Single source of truth for the deployed origin. Consumed by @nuxtjs/sitemap,
// @nuxtjs/robots and canonical/OG tags. Override locally via NUXT_SITE_URL.
const siteUrl = process.env.NUXT_SITE_URL ?? 'https://mdegouw.nl'

// For whoever opens view-source. Injected by the Nitro plugin below rather than
// written into a `.vue` file, because Vue strips template comments from the
// production build — a `<!-- -->` in a template never reaches the output.
const tuxBanner = `\n<!--\n${readFileSync(new URL('public/tux.txt', import.meta.url), 'utf8').trimEnd()}\n\nTux, from Christopher Johnson's ASCII art collection.\nhttps://asciiart.website/art/2098\n\nHe dances in the DevTools element inspector. window.tux.stop() to let him rest.\n-->`

// `render:response` is a *runtime* hook, so it fires in `nuxt dev` as well as
// for every page prerendered by `nuxt generate` — one code path, both modes.
// Written into `.nuxt/` by the inline module below, so the whole easter egg
// stays in this file instead of earning the repo a top-level `server/`
// directory for six lines.
const tuxPlugin = `
// A Nitro plugin is just a function of the app instance; the banner is inlined
// here because this module is bundled separately from nuxt.config.
const DOCTYPE = '<!DOCTYPE html>'
const BANNER = ${JSON.stringify(tuxBanner)}

export default (nitroApp) => {
  nitroApp.hooks.hook('render:response', (response) => {
    if (typeof response.body !== 'string' || !response.body.startsWith(DOCTYPE)) return

    response.body = response.body.replace(DOCTYPE, DOCTYPE + BANNER)
  })
}
`

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@vueuse/nuxt',

    // Registers the view-source easter egg as a Nitro plugin. Inline because it
    // is six lines and has no options worth a module file.
    () => addServerPlugin(addTemplate({ filename: 'tux-plugin.mjs', getContents: () => tuxPlugin, write: true }).dst),
  ],

  // Static-only site: no server runtime exists in production, so `useFetch` to
  // internal API routes is unavailable by design. Content lives in components.
  ssr: true,

  // `pathPrefix: false` everywhere means the file name IS the component name:
  // `components/ui/UiButton.vue` -> `<UiButton>`. Grepping a tag always finds
  // exactly one file, and moving a file between these dirs never renames a tag.
  // The trade-off: names must carry their own prefix (Ui*, The*, *Section).
  components: [
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/sections', pathPrefix: false },
    { path: '~/components', pathPrefix: false },
  ],

  devtools: { enabled: true },

  // Site-wide document defaults. Per-page metadata belongs in the page/component
  // via `useSeoMeta()`, never here.
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · Mathijs de Gouw',
      // SVG first for browsers that take it; the .ico carries 16/32/48 for the
      // rest, and `sizes: 'any'` stops Chrome preferring it over the SVG.
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0a0a0a' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: siteUrl,
    name: 'Mathijs de Gouw',
  },

  colorMode: {
    classSuffix: '', // emits `.dark` / `.light`, matching the Tailwind v4 variant
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'mdegouw-color-mode',
  },

  // Stamped into the HTML at build time and rendered in the footer. There is no
  // server, so every value here is a public compile-time constant — never a key.
  runtimeConfig: {
    public: {
      buildDate: new Date().toISOString().slice(0, 10),
    },
  },

  compatibilityDate: '2025-07-15',

  // GitHub Pages: the `github_pages` preset emits `.nojekyll` (so `/_nuxt/*` is
  // served) and a `404.html` fallback alongside the prerendered pages.
  nitro: {
    preset: 'github_pages',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {
    // Fonts are downloaded and self-hosted at build time: no runtime request to
    // a third-party CDN, no layout shift, no GDPR banner needed.
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
  },

  icon: {
    // Inline SVG + a scanned client bundle: icons ship in the build, so there
    // are no runtime requests to the Iconify API (which would fail offline and
    // leak visitor page views to a third party).
    mode: 'svg',
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
  },

  image: {
    // IPX runs at prerender time; the generated output is plain static files.
    format: ['avif', 'webp'],
    screens: {
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
    },
  },

  robots: {
    // Generated into the static output; do not add a `public/robots.txt`.
    allow: '/',
    sitemap: `${siteUrl}/sitemap.xml`,
  },

  sitemap: {
    autoLastmod: true,
  },
})
