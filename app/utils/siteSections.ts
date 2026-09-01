/**
 * The page is a single route of anchored sections. This list is the one place
 * that knows their order and labels: the header nav, the mobile overlay, the
 * footer nav and the active-section observer all read from it, so adding a
 * section to `pages/index.vue` means adding exactly one entry here.
 *
 * `id` must match the `id` prop passed to the section's `UiSection`.
 */
export interface SiteSection {
  id: string
  label: string
}

export const siteSections: SiteSection[] = [
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]
