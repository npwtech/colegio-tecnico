/**
 * Central, editable source of truth for real-world SEFTI details.
 */
export const WHATSAPP_NUMBER = '5521984017923'
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
  neighborhood: 'Jardim Primavera',
  city: 'Duque de Caxias',
  state: 'RJ',
  cnpj: '67.740.189/0001-20',
  instagramHandle: '@seftioficial',
  instagramUrl: 'https://www.instagram.com/seftioficial/',
}

export const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Cursos', href: '#cursos' },
  { label: 'A escola', href: '#sobre' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'Fotos', href: '#conheca' },
  { label: 'Contato', href: '#contato' },
] as const
