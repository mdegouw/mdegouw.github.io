import { expect, test } from '@playwright/test'

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('a skip link is the first thing a keyboard reaches', async ({ page }) => {
    await page.keyboard.press('Tab')

    const skipLink = page.getByRole('link', { name: 'Skip to content' })
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toBeVisible() // hidden until focused, then not
    await expect(skipLink).toHaveAttribute('href', '#main')
    await expect(page.locator('main#main')).toHaveCount(1)
  })

  test('the header grows a border only once the page has scrolled', async ({ page }) => {
    const header = page.locator('header')

    await expect(header).toHaveClass(/border-transparent/)
    await page.mouse.wheel(0, 400)
    await expect(header).toHaveClass(/border-line/)
  })

  test('the current section is marked by more than colour', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the desktop nav bar is hidden below md')

    // The mobile overlay lives inside <header> too, so scope to the bar itself.
    const bar = page.locator('header nav[aria-label="Sections"]')
    await bar.locator('a[href="#projects"]').click()

    const current = bar.locator('a[aria-current="true"]')
    await expect(current).toHaveText('Projects')
    await expect(current).toHaveClass(/underline/)
  })

  test('the mobile overlay opens, traps Escape, and returns focus', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'the hamburger is hidden from md up')

    const trigger = page.getByRole('button', { name: 'Open navigation' })
    await trigger.click()

    const overlay = page.getByRole('dialog')
    await expect(overlay).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(overlay).toBeHidden()
    // A trap that does not hand focus back strands the keyboard at the top.
    await expect(trigger).toBeFocused()
  })

  test('choosing a section from the mobile overlay closes it and navigates', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'the hamburger is hidden from md up')

    await page.getByRole('button', { name: 'Open navigation' }).click()
    await page.getByRole('dialog').getByRole('link', { name: 'Projects' }).click()

    await expect(page.getByRole('dialog')).toBeHidden()
    await expect(page.locator('section#projects')).toBeInViewport()
  })

  test('the theme toggle switches the class the tokens hang off', async ({ page }) => {
    const toggle = page.getByRole('button', { name: /Switch to (light|dark) theme/ })

    await expect(page.locator('html')).toHaveClass(/dark/)
    await toggle.click()
    await expect(page.locator('html')).toHaveClass(/light/)
    await toggle.click()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('anchor navigation is plain hrefs, so it works before hydration', async ({ page }) => {
    const anchors = page.locator('a[href^="#"]')

    expect(await anchors.count()).toBeGreaterThan(0)
    for (const href of await anchors.evaluateAll(links => links.map(l => l.getAttribute('href')))) {
      await expect(page.locator(href!), `${href} has no target`).toHaveCount(1)
    }
  })
})
