import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import UiButton from '~/components/ui/UiButton.vue'

describe('UiButton', () => {
  it('renders its slot content', async () => {
    const wrapper = await mountSuspended(UiButton, { slots: { default: 'Contact' } })

    expect(wrapper.text()).toContain('Contact')
  })

  it('is a real button when it has no href', async () => {
    const wrapper = await mountSuspended(UiButton, { slots: { default: 'Send' } })

    expect(wrapper.element.tagName).toBe('BUTTON')
    // Without this a button inside a form would submit it.
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('is an anchor when given an href, with no button type', async () => {
    const wrapper = await mountSuspended(UiButton, {
      props: { href: '#contact' },
      slots: { default: 'Contact' },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('#contact')
    expect(wrapper.attributes('type')).toBeUndefined()
  })

  it('only opens a new tab for external links, and pairs it with rel', async () => {
    const internal = await mountSuspended(UiButton, {
      props: { href: '#contact' },
      slots: { default: 'Contact' },
    })
    const external = await mountSuspended(UiButton, {
      props: { href: 'https://github.com/mdegouw', external: true },
      slots: { default: 'GitHub' },
    })

    expect(internal.attributes('target')).toBeUndefined()
    expect(external.attributes('target')).toBe('_blank')
    expect(external.attributes('rel')).toBe('noopener noreferrer')
  })

  it('ignores `external` when there is no href to open', async () => {
    const wrapper = await mountSuspended(UiButton, {
      props: { external: true },
      slots: { default: 'Send' },
    })

    expect(wrapper.attributes('target')).toBeUndefined()
  })

  it('defaults to the primary variant and switches on request', async () => {
    const primary = await mountSuspended(UiButton, { slots: { default: 'Go' } })
    const ghost = await mountSuspended(UiButton, {
      props: { variant: 'ghost' },
      slots: { default: 'Go' },
    })

    expect(primary.classes()).toContain('bg-accent')
    expect(ghost.classes()).not.toContain('bg-accent')
    expect(ghost.classes()).toContain('border-line')
  })

  it('keeps a visible focus ring', async () => {
    const wrapper = await mountSuspended(UiButton, { slots: { default: 'Go' } })

    expect(wrapper.classes()).toContain('focus-visible:outline-accent')
  })
})
