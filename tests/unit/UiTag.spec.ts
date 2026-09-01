import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import UiTag from '~/components/ui/UiTag.vue'

describe('UiTag', () => {
  it('renders its slot content in mono', async () => {
    const wrapper = await mountSuspended(UiTag, { slots: { default: 'TypeScript' } })

    expect(wrapper.text()).toBe('TypeScript')
    expect(wrapper.classes()).toContain('font-mono')
  })

  it('is quiet by default and accented only when asked', async () => {
    const secondary = await mountSuspended(UiTag, { slots: { default: 'Redis' } })
    const primary = await mountSuspended(UiTag, {
      props: { variant: 'primary' },
      slots: { default: 'C#' },
    })

    expect(secondary.classes()).toContain('text-ink-subtle')
    expect(primary.classes()).toContain('text-accent')
    expect(primary.classes()).toContain('bg-accent-wash')
  })

  it('is not interactive — a clickable tag would have to be a button', async () => {
    const wrapper = await mountSuspended(UiTag, { slots: { default: 'Docker' } })

    expect(wrapper.element.tagName).toBe('SPAN')
  })
})
