import { useMagnetic } from '@/hooks/useMagnetic'
import { whatsappLink } from '@/lib/site-config'
import { WhatsAppIcon } from './icons'

interface WhatsAppButtonProps {
  message?: string
  label?: string
  compact?: boolean
  className?: string
}

export function WhatsAppButton({ message, label = 'Fale conosco', compact = false, className = '' }: WhatsAppButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>(0.2)

  return (
    <a
      ref={ref}
      href={whatsappLink(message)}
      target="_blank"
      rel="noreferrer"
      className={`group relative inline-flex items-center gap-2 rounded-full bg-[#25D366] font-subtitle font-semibold text-navy-950 shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55)] transition-transform duration-300 hover:scale-[1.03] ${
        compact ? 'px-3.5 py-2 text-xs' : 'px-5 py-2.5 text-sm'
      } ${className}`}
    >
      <WhatsAppIcon className={compact ? 'size-4' : 'size-4.5'} />
      {!compact && <span>{label}</span>}
    </a>
  )
}
