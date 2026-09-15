export type Audience = 'infancia' | 'adolescencia' | 'adultos' | 'terceira-idade'

export interface Course {
  id: string
  index: string
  title: string
  summary: string
  topics: string[]
  audience: Audience[]
}

export const AUDIENCE_LABEL: Record<Audience, string> = {
  infancia: 'Crianças',
  adolescencia: 'Adolescentes',
  adultos: 'Jovens e adultos',
  'terceira-idade': 'Terceira idade',
}

export const AUDIENCE_FILTERS: { id: Audience | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos os cursos' },
  { id: 'infancia', label: 'Crianças' },
  { id: 'adolescencia', label: 'Adolescentes' },
  { id: 'adultos', label: 'Jovens e adultos' },
  { id: 'terceira-idade', label: 'Terceira idade' },
]

export const COURSES: Course[] = [
  {
    id: 'informatica-basica',
    index: '01',
    title: 'Informática Básica',
    summary:
      'Primeiros passos no computador: sistema operacional, internet, editores de texto e ferramentas essenciais do dia a dia.',
    topics: ['Windows e arquivos', 'Internet e e-mail', 'Editor de texto e planilhas', 'Segurança digital básica'],
    audience: ['adultos'],
  },
  {
    id: 'montagem-manutencao',
    index: '02',
    title: 'Montagem e Manutenção de Computadores',
    summary:
      'Hardware na prática: como montar, diagnosticar e resolver problemas comuns em computadores, do zero ao avançado.',
    topics: ['Componentes internos', 'Montagem completa', 'Diagnóstico de falhas', 'Manutenção preventiva'],
    audience: ['adolescencia', 'adultos'],
  },
  {
    id: 'robotica-criancas',
    index: '03',
    title: 'Robótica para Crianças',
    summary:
      'Lógica, criatividade e primeiros contatos com robótica através de projetos práticos e lúdicos, pensados para as primeiras idades.',
    topics: ['Lógica de programação lúdica', 'Montagem guiada de robôs', 'Projetos em equipe', 'Pensamento computacional'],
    audience: ['infancia'],
  },
  {
    id: 'robotica-adolescentes',
    index: '04',
    title: 'Robótica para Adolescentes',
    summary:
      'Um passo além: programação, automação e eletrônica aplicadas à construção de projetos de robótica mais complexos.',
    topics: ['Programação de robôs', 'Sensores e automação', 'Eletrônica aplicada', 'Projetos autorais'],
    audience: ['adolescencia'],
  },
  {
    id: 'informatica-terceira-idade',
    index: '05',
    title: 'Informática para a Terceira Idade',
    summary:
      'Aulas no ritmo certo, com paciência e acolhimento, para aproximar a terceira idade da tecnologia com autonomia e confiança.',
    topics: ['Uso do computador do zero', 'Internet, e-mail e vídeo-chamadas', 'Aplicativos do dia a dia', 'Segurança online'],
    audience: ['terceira-idade'],
  },
  {
    id: 'celular-idosos',
    index: '06',
    title: 'Celular para Idosos',
    summary:
      'Um curso focado em smartphones: aplicativos, mensagens, fotos e serviços úteis para o dia a dia, explicados com calma.',
    topics: ['Configurações essenciais', 'WhatsApp e mensagens', 'Fotos e vídeo-chamadas', 'Aplicativos úteis do dia a dia'],
    audience: ['terceira-idade'],
  },
]
