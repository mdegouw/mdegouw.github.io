import { expect, test } from '@playwright/test'

/**
 * Deployment-contract tests: these assert things that must hold for *any*
 * version of the site, so they stay valid as content is built out. They are the
 * canary for a broken static build — keep them free of content-specific
 * assertions (those belong in per-section specs, e.g. `hero.spec.ts`).
 */
test.describe('static build contract', () => {
  test('home page is served and fully rendered', async ({ page }) => {
    const response = await page.goto('/')

    expect(response?.status()).toBe(200)

    // Prerendered HTML must contain real markup, not an empty SPA shell:
    // proof that SSG actually rendered the page.
    const html = await page.content()
    expect(html).toContain('<div id="__nuxt">')
    expect(await page.locator('#__nuxt').innerHTML()).not.toBe('')

    await expect(page).toHaveTitle(/\S/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('page hydrates without console errors or failed requests', async ({ page }) => {
    const consoleErrors: string[] = []
    const failedRequests: string[] = []

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })
    page.on('requestfailed', (request) => {
      failedRequests.push(`${request.method()} ${request.url()}`)
    })
    page.on('response', (response) => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.status()} ${response.url()}`)
      }
    })

    await page.goto('/', { waitUntil: 'networkidle' })

    expect(consoleErrors, 'console errors during hydration').toEqual([])
    expect(failedRequests, 'failed or 4xx/5xx requests').toEqual([])
  })

  test('unknown routes fall back to the generated 404 page', async ({ page }) => {
    const response = await page.goto('/definitely-not-a-real-route')

    // GitHub Pages serves `404.html` with a 404 status for unmatched paths;
    // the `github_pages` Nitro preset is what emits that file.
    expect(response?.status()).toBe(404)
    expect(await page.content()).not.toBe('')
  })

  test('robots.txt and sitemap.xml are present in the output', async ({ request }) => {
    const robots = await request.get('/robots.txt')
    expect(robots.status()).toBe(200)
    expect(await robots.text()).toContain('Sitemap:')

    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    expect(await sitemap.text()).toContain('<urlset')
  })
})

test.describe('easter egg', () => {
  test('every generated page carries Tux in a source comment', async ({ request }) => {
    // Injected by the Nitro plugin registered in `nuxt.config.ts`. It is the
    // only thing that puts an HTML comment in the output, so a silent Nitro
    // hook rename would otherwise go unnoticed.
    for (const path of ['/', '/definitely-not-a-real-route']) {
      const html = await (await request.get(path)).text()
      expect(html, `Tux missing from ${path}`).toContain('https://asciiart.website/art/2098')
      // It has to be the first thing a reader sees, not buried at the bottom.
      expect(html.indexOf('<!--'), `Tux not at the top of ${path}`).toBeLessThan(200)
    }
  })

  test('the penguin sways once the page is hydrated', async ({ page }) => {
    await page.goto('/')

    // The comment is a child of the document, above `<html>` — `useTuxDance`
    // rewrites this node, which is what the element inspector shows.
    const banner = () => page.evaluate(() =>
      Array.from(document.childNodes)
        .find((node): node is Comment =>
          node instanceof Comment && node.data.includes('asciiart.website'))
        ?.data ?? '',
    )

    const firstFrame = await banner()
    expect(firstFrame).not.toBe('')
    await expect.poll(banner, { message: 'Tux never moved' }).not.toBe(firstFrame)

    // Only the art is allowed to move; the attribution has to stay readable.
    expect(await banner()).toContain('https://asciiart.website/art/2098')

    // The comment promises this handle works, so it is part of the contract.
    await page.evaluate(() => window.tux?.stop())
    const resting = await banner()
    await page.waitForTimeout(500)
    expect(await banner(), 'stop() did not stop the dance').toBe(resting)
  })
})
