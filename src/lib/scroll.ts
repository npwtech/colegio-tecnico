/** Smoothly scrolls to a section, using Lenis when it's mounted and falling
 * back to the native smooth-scroll API otherwise (reduced-motion visitors). */
export function scrollToSection(id: string) {
  const target = document.querySelector<HTMLElement>(id)
  if (!target) return

  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: -88, duration: 1.3 })
    return
  }

  const top = target.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top, behavior: 'smooth' })
}
