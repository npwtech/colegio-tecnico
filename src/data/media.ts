/**
 * Placeholder photography sourced from Pexels (free license, no attribution
 * required). These stand in for real SEFTI photos — swap each `src` for a
 * photo of the actual school (same aspect ratio works best) whenever they're
 * available, the rest of the site doesn't need to change.
 */
function pexels(id: number, w = 1400) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
}

export const PHOTOS = {
  labWide: { src: pexels(10643463), alt: 'Alunos em um laboratório de informática escolar' },
  labKids: { src: pexels(5621945), alt: 'Crianças usando computadores em um laboratório' },
  classroom: { src: pexels(7743256), alt: 'Turma reunida em sala de aula' },
  security: { src: pexels(3205737), alt: 'Câmera de segurança monitorando o ambiente' },
  workbenchSolder: { src: pexels(2136243), alt: 'Mão soldando um componente em uma placa de circuito' },
  workbenchTech: { src: pexels(38190065), alt: 'Técnico reparando uma placa de circuito em bancada' },
  circuitBoard: { src: pexels(3912373), alt: 'Mãos segurando uma placa de circuito' },
  studentsComputers: { src: pexels(5539293), alt: 'Estudantes trabalhando em computadores' },
  kidsRobotics: { src: pexels(7869085), alt: 'Crianças montando robôs em sala de aula' },
  kidsRoboticsHands: { src: pexels(7750751), alt: 'Mãos de crianças montando peças de um robô' },
  teenRobotics: { src: pexels(7869041), alt: 'Adolescentes fazendo robótica em equipe' },
  seniorClass: { src: pexels(7983557), alt: 'Pessoas da terceira idade em aula de informática' },
  seniorLaptop: { src: pexels(7983559), alt: 'Pessoas da terceira idade sentadas com notebooks em sala de aula' },
  seniorPhone: { src: pexels(7331674), alt: 'Senhora usando um smartphone' },
  seniorPhone2: { src: pexels(7544864), alt: 'Idosa sorrindo enquanto usa um smartphone' },
} as const

export type PhotoKey = keyof typeof PHOTOS
