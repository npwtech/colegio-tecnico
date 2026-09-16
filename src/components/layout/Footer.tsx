import { Logo } from '@/components/ui/Logo'
import { InstagramIcon } from '@/components/ui/icons'
import { NAV_LINKS, SITE } from '@/lib/site-config'
import { scrollToSection } from '@/lib/scroll'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-navy-950 pb-10 pt-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 sm:px-10">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-sm">
            <Logo markSize={34} showTagline />
            <p className="mt-5 font-sans text-sm leading-relaxed text-mist-500">
              {SITE.fullName}. Tecnologia e inovação para todas as gerações, em {SITE.city}, {SITE.state}.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 sm:justify-end">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="font-subtitle text-sm text-mist-300 transition-colors hover:text-gold-300"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="font-sans text-xs text-mist-500">
            © {year} {SITE.name}. Todos os direitos reservados. CNPJ {SITE.cnpj}
          </p>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-subtitle text-xs text-mist-300 hover:text-gold-300"
          >
            <InstagramIcon className="size-4" />
            {SITE.instagramHandle}
          </a>
        </div>
      </div>
    </footer>
  )
}
