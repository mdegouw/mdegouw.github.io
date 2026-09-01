import type { Ref } from 'vue'

/**
 * Tracks which anchored section the reader is currently looking at, so the
 * header nav can mark it. The `rootMargin` shrinks the viewport to a band just
 * below the sticky header: a section counts as "current" once its top rises
 * past 40% of the viewport, and stops counting when it scrolls out under the
 * header. Without that band, two adjacent sections are both intersecting for
 * most of a scroll and the highlight flickers.
 *
 * Returns an empty string while the hero is in view — nothing in the nav
 * points at the hero, so nothing should be highlighted there.
 */
export function useActiveSection(): Readonly<Ref<string>> {
  const activeId = ref('')
  const targets = shallowRef<HTMLElement[]>([])
  const visibleIds = new Set<string>()

  onMounted(() => {
    targets.value = siteSections
      .map(section => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null)
  })

  useIntersectionObserver(
    targets,
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleIds.add(entry.target.id)
        else visibleIds.delete(entry.target.id)
      }

      // Adjacent sections share an edge, so both qualify during a handover.
      // The later one in page order is the one being scrolled into.
      activeId.value = siteSections.findLast(section => visibleIds.has(section.id))?.id ?? ''
    },
    // rootMargin only accepts px or %, never rem — 64px is the header height.
    { rootMargin: '-64px 0px -60% 0px' },
  )

  return readonly(activeId)
}
