import { useEffect, useRef, useState } from 'react'

/** Reports once an element has scrolled near the viewport, then stays true.
 * Used to defer mounting a WebGL canvas until it's about to be seen, so a
 * page full of them doesn't spin up every GPU context on first paint. */
export function useInView<T extends HTMLElement>(rootMargin = '400px') {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, inView])

  return [ref, inView] as const
}
