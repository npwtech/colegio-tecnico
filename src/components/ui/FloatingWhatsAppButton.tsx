import { whatsappLink } from '@/lib/site-config'
import { WhatsAppIcon } from './icons'

export function FloatingWhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      style={{
        bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
        right: 'max(1.25rem, env(safe-area-inset-right))',
      }}
      className="fixed z-[9999] flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2CE072] to-[#20BA5A] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-110"
    >
      <WhatsAppIcon className="size-9" />
    </a>
  )
}
