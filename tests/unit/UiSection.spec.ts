import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import UiSection from '~/components/ui/UiSection.vue'

const props = { id: 'projects', label: 'Projects', heading: 'Things I have shipped' }

describe('UiSection', () => {
  it('gives the section an accessible name via its own heading', async () => {
    const wrapper = await mountSuspended(UiSection, { props })
    const section = wrapper.find('section')
    const heading = wrapper.find('h2')

    expect(section.attributes('id')).toBe('projects')
    expect(heading.attributes('id')).toBe(section.attributes('aria-labelledby'))
    expect(heading.text()).toBe('Things I have shipped')
  })

  it('renders the lead only when there is one', async () => {
    const without = await mountSuspended(UiSection, { props })
    const withLead = await mountSuspended(UiSection, {
      props: { ...props, lead: 'Actively used in production.' },
    })

    expect(without.findAll('p')).toHaveLength(1) // the eyebrow only
    expect(withLead.text()).toContain('Actively used in production.')
  })

  it('renders slot content beneath the heading', async () => {
    const wrapper = await mountSuspended(UiSection, {
      props,
      slots: { default: '<p>Body</p>' },
    })

    expect(wrapper.text()).toContain('Body')
  })

  it('narrows and centres only in the centered variant', async () => {
    const standard = await mountSuspended(UiSection, { props })
    const centered = await mountSuspended(UiSection, {
      props: { ...props, variant: 'centered' },
    })

    expect(standard.html()).toContain('max-w-content')
    expect(centered.html()).toContain('max-w-2xl')
    expect(centered.html()).toContain('text-center')
  })
})
