import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { useIntroReady } from '@/lib/introContext'
import { scrollToSection } from '@/lib/scroll'
import { NAV_LINKS, SITE } from '@/lib/site-config'
import { Logo } from '@/components/ui/Logo'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { MenuIcon, CloseIcon } from '@/components/ui/icons'

export function Header() {
  const introReady = useIntroReady()
  const rootRef = useRef<HTMLElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const menuTlRef = useRef<gsap.core.Timeline | null>(null)
  const indicatorRef = useRef<HTMLSpanElement | null>(null)
  const navRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('#inicio')

  // Background blur + intelligent auto-hide on scroll direction.
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      onUpdate: (self) => {
        setScrolled(self.scroll() > 24)
        if (open || self.scroll() < 140) {
          setHidden(false)
          return
        }
        setHidden(self.direction === 1)
      },
    })
    return () => st.kill()
  }, [open])

  // Scroll-spy for the active nav item.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector<HTMLElement>(link.href)).filter(
      (el): el is HTMLElement => Boolean(el),
    )
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Slide the pill indicator under whichever nav item is active.
  useEffect(() => {
    const el = navRefs.current[activeId]
    const indicator = indicatorRef.current
    if (!el || !indicator) return
    gsap.to(indicator, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      duration: 0.55,
      ease: 'power3.out',
    })
  }, [activeId])

  // Header entrance, once the preloader curtain lifts.
  useGSAP(
    () => {
      if (!introReady) return
      gsap.from('[data-header-item]', {
        yPercent: -160,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.07,
        delay: 0.05,
      })
    },
    { scope: rootRef, dependencies: [introReady] },
  )

  // Mobile menu open/close timeline (built once, played/reversed on demand).
  useGSAP(
    () => {
      const tl = gsap
        .timeline({ paused: true })
        .to(panelRef.current, {
          clipPath: 'circle(170% at calc(100% - 44px) 44px)',
          duration: 0.85,
          ease: 'power4.inOut',
        })
        .from(
          '[data-mobile-link]',
          { yPercent: 130, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'power3.out' },
          '-=0.4',
        )
        .from('[data-mobile-extra]', { opacity: 0, y: 16, duration: 0.5 }, '-=0.3')
      menuTlRef.current = tl
    },
    // The mobile panel is a sibling of <header>, not a child of it, so the
    // selector-based targets above only resolve when scoped to panelRef.
    { scope: panelRef },
  )

  useEffect(() => {
    if (open) menuTlRef.current?.play()
    else menuTlRef.current?.reverse()

    document.documentElement.style.overflow = open ? 'hidden' : ''
    window.__lenis?.[open ? 'stop' : 'start']()
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleNav = useCallback((href: string) => {
    setOpen(false)
    // The `open` effect below also resumes Lenis, but that runs after this
    // click handler — resume synchronously here so scrollToSection doesn't
    // fire while Lenis is still stopped from an open mobile menu.
    window.__lenis?.start()
    scrollToSection(href)
  }, [])

  return (
    <>
      <header
        ref={rootRef}
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
          hidden ? '-translate-y-[130%]' : 'translate-y-0'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-in-out-quart)' }}
      >
        <div
          className={`mx-3 mt-3 flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-500 sm:mx-6 sm:mt-4 sm:px-6 ${
            scrolled ? 'glass-panel shadow-[0_10px_40px_-15px_rgba(0,0,0,0.65)]' : 'border border-transparent'
          }`}
        >
          <a
            data-header-item
            data-cursor-hover
            href="#inicio"
            onClick={(e) => {
              e.preventDefault()
              handleNav('#inicio')
            }}
            aria-label="SEFTI — início"
          >
            <Logo markSize={scrolled ? 30 : 60} />
          </a>

          <nav className="relative hidden items-center gap-0.5 xl:flex">
            <span ref={indicatorRef} className="absolute inset-y-0 left-0 -z-10 w-0 rounded-full bg-gold-400" />
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                ref={(el) => {
                  navRefs.current[link.href] = el
                }}
                data-header-item
                data-cursor-hover
                onClick={() => handleNav(link.href)}
                className={`whitespace-nowrap rounded-full px-3 py-2 font-subtitle text-sm font-medium transition-colors duration-300 ${
                  activeId === link.href ? 'text-navy-950' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              data-header-item
              data-cursor-hover
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white xl:hidden"
            >
              {open ? <CloseIcon className="size-4.5" /> : <MenuIcon className="size-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu, revealed via an expanding clip-path circle. */}
      <div
        ref={panelRef}
        style={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
        className={`noise-overlay fixed inset-0 z-40 flex flex-col overflow-y-auto bg-navy-950 bg-grid px-8 pb-8 pt-24 xl:hidden ${
          open ? '' : 'pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-1 flex-col justify-center gap-0.5 py-4">
          {NAV_LINKS.map((link, i) => (
            <div key={link.href} className="overflow-hidden">
              <button
                data-mobile-link
                onClick={() => handleNav(link.href)}
                className="flex w-full items-center gap-3 py-2 text-left font-display text-2xl font-extrabold text-white active:text-gold-300 sm:text-3xl"
              >
                <span className="font-subtitle text-xs font-medium text-gold-400 sm:text-sm">0{i + 1}</span>
                {link.label}
              </button>
            </div>
          ))}
        </nav>

        <div data-mobile-extra className="flex shrink-0 items-center justify-between border-t border-white/10 pt-6">
          <WhatsAppButton label="Fale no WhatsApp" />
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="font-subtitle text-sm font-medium text-mist-300 underline-offset-4 hover:text-gold-300 hover:underline"
          >
            {SITE.instagramHandle}
          </a>
        </div>
      </div>
    </>
  )
}
