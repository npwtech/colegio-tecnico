/**
 * Central, editable source of truth for real-world SEFTI details.
 *
 * IMPORTANT: WHATSAPP_NUMBER below is a placeholder — swap it for the
 * school's real WhatsApp number (digits only, with country + area code,
 * e.g. "5521999999999") before publishing this site.
 */
export const WHATSAPP_NUMBER = '5521999999999'
export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá! Vim pelo site da SEFTI e gostaria de saber mais sobre os cursos.'

export function whatsappLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const SITE = {
  name: 'SEFTI',
  fullName: 'Sistema Educacional Focado em Tecnologia e Inovação',
  tagline: 'Tecnologia para todas as gerações',
  url: 'https://www.sefti.com.br',
  city: 'Duque de Caxias',
  state: 'RJ',
  instagramHandle: '@sefti.oficial',
  instagramUrl: 'https://instagram.com/sefti.oficial',
}

export const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Cursos', href: '#cursos' },
  { label: 'Sobre a SEFTI', href: '#sobre' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'Contato', href: '#contato' },
] as const
