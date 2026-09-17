import type { PhotoKey } from './media'

export type Audience = 'infancia' | 'adolescencia' | 'adultos' | 'terceira-idade'

export interface Course {
  id: string
  index: string
  title: string
  summary: string
  topics: string[]
  audience: Audience[]
  photo: PhotoKey
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
      'Do zero ao domínio do computador: Windows, digitação, internet segura, e-mail, Word, Excel e PowerPoint. A base que abre portas no mercado de trabalho.',
    topics: ['Windows e arquivos', 'Internet e e-mail', 'Editor de texto e planilhas', 'Segurança digital básica'],
    audience: ['adultos'],
    photo: 'studentsComputers',
  },
  {
    id: 'montagem-manutencao',
    index: '02',
    title: 'Montagem e Manutenção de Computadores',
    summary:
      'Monte, configure e conserte computadores de verdade, em bancada. Um curso que vira profissão: saia pronto para atender clientes e gerar renda.',
    topics: ['Componentes internos', 'Montagem completa', 'Diagnóstico de falhas', 'Manutenção preventiva'],
    audience: ['adolescencia', 'adultos'],
    photo: 'circuitBoard',
  },
  {
    id: 'robotica-criancas',
    index: '03',
    title: 'Robótica para Crianças',
    summary:
      'Montando robôs de verdade, a criançada desenvolve raciocínio lógico e criatividade brincando. E o robô montado vai para casa com o aluno!',
    topics: ['Lógica de programação lúdica', 'Montagem guiada de robôs', 'Projetos em equipe', 'Pensamento computacional'],
    audience: ['infancia'],
    photo: 'kidsRobotics',
  },
  {
    id: 'robotica-adolescentes',
    index: '04',
    title: 'Robótica para Adolescentes',
    summary:
      'Projetos mais avançados de eletrônica e programação: sensores, automação e lógica aplicada. Preparação de verdade para as profissões do futuro.',
    topics: ['Programação de robôs', 'Sensores e automação', 'Eletrônica aplicada', 'Projetos autorais'],
    audience: ['adolescencia'],
    photo: 'teenRobotics',
  },
  {
    id: 'informatica-terceira-idade',
    index: '05',
    title: 'Informática para a Terceira Idade',
    summary:
      'Aulas com paciência, carinho e no ritmo certo para quem tem 60+. Computador sem medo: internet, chamadas de vídeo com a família, documentos e muito mais.',
    topics: ['Uso do computador do zero', 'Internet, e-mail e vídeo-chamadas', 'Aplicativos do dia a dia', 'Segurança online'],
    audience: ['terceira-idade'],
    photo: 'seniorLaptop',
  },
  {
    id: 'celular-idosos',
    index: '06',
    title: 'Celular para Idosos',
    summary:
      'WhatsApp, fotos, chamadas de vídeo, aplicativos do banco e proteção contra golpes. Independência digital explicada passo a passo, quantas vezes for preciso.',
    topics: ['Configurações essenciais', 'WhatsApp e mensagens', 'Fotos e vídeo-chamadas', 'Aplicativos úteis do dia a dia'],
    audience: ['terceira-idade'],
    photo: 'seniorPhone2',
  },
]
