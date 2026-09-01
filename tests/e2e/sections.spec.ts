import { expect, test } from '@playwright/test'

/**
 * Structural, not editorial: these assert the contract every section owes the
 * page — an anchor, an accessible name, real content — so rewriting the copy
 * does not turn the suite red.
 */
const ANCHORED_SECTIONS = ['expertise', 'experience', 'projects', 'about', 'contact']

test.describe('sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  for (const id of ANCHORED_SECTIONS) {
    test(`${id} renders, is named, and is reachable from the nav`, async ({ page }) => {
      const section = page.locator(`section#${id}`)
      await expect(section).toHaveCount(1)

      // aria-labelledby must resolve to a heading with real text, or the
      // section is anonymous to a screen reader's landmark list.
      const headingId = await section.getAttribute('aria-labelledby')
      expect(headingId).toBeTruthy()
      const heading = page.locator(`#${headingId}`)
      await expect(heading).toHaveJSProperty('tagName', 'H2')
      await expect(heading).not.toBeEmpty()

      await page.locator(`footer a[href="#${id}"]`).click()
      await expect(section).toBeInViewport()
    })
  }

  test('every reveal fires once the reader has scrolled past it', async ({ page }) => {
    const step = page.viewportSize()!.height
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight)

    for (let y = 0; y <= pageHeight; y += step) {
      await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), y)
      await page.waitForTimeout(120)
    }
    await page.waitForTimeout(500)

    // Anything still hidden after a full read-through is invisible for good.
    await expect(page.locator('[data-reveal="hidden"]')).toHaveCount(0)
  })

  test('the page never scrolls sideways', async ({ page }) => {
    const overflow = await page.evaluate(() => {
      const root = document.documentElement
      return root.scrollWidth - root.clientWidth
    })

    expect(overflow).toBeLessThanOrEqual(0)
  })
})
