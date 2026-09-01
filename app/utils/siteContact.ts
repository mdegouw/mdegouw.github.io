/**
 * Contact details, shared by the Contact section and the footer.
 */
export interface SiteLink {
  label: string
  href: string
  icon: string
}

export const contactEmail = 'contact@mdegouw.nl'

export const socialLinks: SiteLink[] = [
  { label: 'GitHub', href: 'https://github.com/mdegouw', icon: 'lucide:github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mathijs-de-gouw', icon: 'lucide:linkedin' },
]
