import { expect, test } from '@playwright/test'

test.describe('hero', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('leads with the name as the page’s only h1', async ({ page }) => {
    const headings = page.getByRole('heading', { level: 1 })

    await expect(headings).toHaveCount(1)
    await expect(headings).toHaveText('Mathijs de Gouw')
  })

  test('renders the terminal prompt with the command separated from it', async ({ page }) => {
    const prompt = page.getByText(/@.+:~\$/)

    await expect(prompt).toBeVisible()
    // A regression here reads as `:~$whoami`, which is the tell that Vue
    // stripped the whitespace between the prompt and the command.
    await expect(prompt).toHaveText(/:~\$\s\S/)
  })

  test('states availability in text, not colour alone', async ({ page }) => {
    await expect(page.getByText(/^status:/)).toBeVisible()
  })

  test('both calls to action point at sections that exist on the page', async ({ page }) => {
    const ctas = page.locator('section#top a[href^="#"]')

    await expect(ctas).toHaveCount(2)

    for (const href of await ctas.evaluateAll(links => links.map(link => link.getAttribute('href')))) {
      await expect(page.locator(href!)).toHaveCount(1)
    }
  })

  test('is visible without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto('/')

    // The scroll reveal must never ship `opacity: 0` as the static default.
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('link', { name: 'View experience' })).toBeVisible()

    await context.close()
  })
})
