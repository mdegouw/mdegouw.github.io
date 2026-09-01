import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import UiTerminalLine from '~/components/ui/UiTerminalLine.vue'

const props = { user: 'mathijs', host: 'mdegouw', command: 'whoami' }

describe('UiTerminalLine', () => {
  it('renders a shell prompt with the command separated from it', async () => {
    const wrapper = await mountSuspended(UiTerminalLine, { props })

    // Non-breaking spaces: Vue strips ordinary whitespace between elements,
    // which once ran the prompt and the command together as `:~$whoami`.
    expect(wrapper.text().replace(/\u00a0/g, ' ')).toContain('mathijs@mdegouw:~$ whoami')
  })

  it('renders as a paragraph, not a fake terminal window', async () => {
    const wrapper = await mountSuspended(UiTerminalLine, { props })

    expect(wrapper.element.tagName).toBe('P')
  })

  it('shows the blinking cursor only when asked, and hides it from screen readers', async () => {
    const without = await mountSuspended(UiTerminalLine, { props })
    const withCursor = await mountSuspended(UiTerminalLine, {
      props: { ...props, cursor: true },
    })

    expect(without.find('.animate-cursor-blink').exists()).toBe(false)

    const cursor = withCursor.find('.animate-cursor-blink')
    expect(cursor.exists()).toBe(true)
    expect(cursor.attributes('aria-hidden')).toBe('true')
  })
})
