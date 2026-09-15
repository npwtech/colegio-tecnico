import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'
import { ArrowUpRightIcon } from './icons'

type Variant = 'primary' | 'outline' | 'ghost'

const base =
  'group relative inline-flex items-center gap-2.5 rounded-full font-subtitle font-semibold tracking-tight transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400'

const variants: Record<Variant, string> = {
  primary: 'bg-gold-400 text-navy-950 px-6 py-3.5 text-sm hover:bg-gold-300',
  outline: 'border border-white/25 text-white px-6 py-3.5 text-sm hover:border-gold-400/70 hover:text-gold-300',
  ghost: 'text-white px-1 py-1 text-sm hover:text-gold-300',
}

interface SharedProps {
  children: ReactNode
  variant?: Variant
  icon?: ReactNode
  showArrow?: boolean
  className?: string
  magnetic?: boolean
}

type AnchorProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

export function Button(props: AnchorProps | ButtonProps) {
  const { children, variant = 'primary', icon, showArrow = true, className = '', magnetic = true, ...rest } = props
  const magneticRef = useMagnetic<HTMLAnchorElement | HTMLButtonElement>(0.22)
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  )

  const classes = `${base} ${variants[variant]} ${className}`

  if ('href' in props && props.href) {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        {...anchorRest}
        href={props.href}
        ref={magnetic ? (magneticRef as Ref<HTMLAnchorElement>) : undefined}
        className={classes}
      >
        {content}
      </a>
    )
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button
      {...buttonRest}
      ref={magnetic ? (magneticRef as Ref<HTMLButtonElement>) : undefined}
      className={classes}
    >
      {content}
    </button>
  )
}
