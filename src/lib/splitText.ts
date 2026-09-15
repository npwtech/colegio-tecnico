/**
 * Lightweight word-splitter used for headline reveal animations (no GSAP
 * SplitText license required). Wraps each word in an overflow-hidden mask
 * span so the returned inner spans can be translated in from below.
 */
export function splitWords(container: HTMLElement): HTMLElement[] {
  const text = container.textContent ?? ''
  const parts = text.split(/(\s+)/)
  container.innerHTML = ''
  const inners: HTMLElement[] = []

  parts.forEach((part) => {
    if (part === '') return
    if (/^\s+$/.test(part)) {
      container.appendChild(document.createTextNode(' '))
      return
    }
    const mask = document.createElement('span')
    mask.style.display = 'inline-block'
    mask.style.overflow = 'hidden'
    mask.style.verticalAlign = 'top'
    mask.style.paddingBottom = '0.08em'
    mask.style.marginBottom = '-0.08em'

    const inner = document.createElement('span')
    inner.style.display = 'inline-block'
    inner.style.willChange = 'transform'
    inner.textContent = part

    mask.appendChild(inner)
    container.appendChild(mask)
    inners.push(inner)
  })

  return inners
}
