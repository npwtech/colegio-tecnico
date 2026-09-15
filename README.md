# SEFTI — site institucional

Experiência digital para a **SEFTI** (Sistema Educacional Focado em Tecnologia e Inovação), construída como uma jornada de scroll única — não como um template institucional de seções empilhadas. Inclui uma cena 3D (Three.js/React Three Fiber) no hero, animações coordenadas com GSAP + ScrollTrigger, scroll suave via Lenis e uma seção "Estrutura" com scroll horizontal pinado.

## Antes de publicar — ação necessária

O número de WhatsApp usado em todos os botões "Fale no WhatsApp" do site é um **placeholder**. Abra:

```
src/lib/site-config.ts
```

e troque `WHATSAPP_NUMBER` pelo número real da SEFTI (formato: código do país + DDD + número, só dígitos, ex: `5521999999999`). Esse mesmo arquivo também centraliza o link do Instagram, a cidade/UF e o link do site — confira se está tudo correto antes de publicar.

Todo o conteúdo (cursos, diferenciais, textos institucionais) usa apenas as informações fornecidas no briefing. Não há depoimentos, avaliações, números de alunos ou certificações inventados — se a SEFTI quiser incluir esse tipo de conteúdo no futuro, ele deve vir de dados reais.

## Stack

- **React 19 + TypeScript + Vite 8**
- **Tailwind CSS v4** (tokens de marca em `src/index.css`, via `@theme`)
- **GSAP 3 + ScrollTrigger + Flip** (`@gsap/react` para integração idiomática com React)
- **Lenis** para scroll suave, sincronizado ao ticker do GSAP
- **Three.js + React Three Fiber + Drei + @react-three/postprocessing** para a cena 3D do hero (rede/circuito abstrato com bloom)

## Rodando o projeto

```bash
npm install
npm run dev       # ambiente de desenvolvimento
npm run build     # build de produção (dist/)
npm run preview   # serve o build de produção localmente
npm run lint      # oxlint
```

Requer Node 20+.

## Estrutura do projeto

```
src/
  components/
    layout/     # Header, Footer, Preloader
    sections/   # Hero, About, Courses, Structure, Contact
    three/      # Cena 3D do hero (rede de nós + bloom) e fallback CSS
    ui/         # Botões, logo, ícones, cursor customizado, etc.
  data/         # Conteúdo dos 6 cursos
  hooks/        # Lenis, reduced-motion, magnetic hover, tilt, scroll reveal, WebGL check
  lib/          # Config central (WhatsApp, links), GSAP setup, utilitário de split de texto
```

## Decisões de design que valem explicar

- **Logo**: recriado em SVG/CSS a partir da identidade visual enviada (capelo + "S" com traço de circuito), não é um recorte da arte enviada — assim ele escala com nitidez e pode ser animado peça por peça. Se a SEFTI tiver o arquivo vetorial oficial da marca, vale substituir `src/components/ui/Logo.tsx` por ele.
- **Sem fotos de pessoas/estrutura reais**: como não recebemos fotos reais da equipe, alunos ou do laboratório, o site usa ilustração abstrata (a cena 3D, gradientes, ícones) em vez de fotos genéricas de banco de imagens que pareceriam reais sem ser. Quando a SEFTI tiver fotos próprias, elas têm ótimo espaço na seção "Sobre" e "Estrutura".
- **Performance**: a cena 3D é carregada sob demanda (`React.lazy`), separada em um chunk próprio, e cai para um fallback em CSS puro em dispositivos sem WebGL ou com `prefers-reduced-motion` ativado. Todas as animações GSAP respeitam essa mesma preferência.
- **Fontes**: Montserrat (títulos), Poppins (subtítulos) e Inter (texto) via Google Fonts, exatamente como no manual de marca. Isso exige acesso à internet em produção — se a hospedagem final bloquear `fonts.googleapis.com`, será necessário hospedar as fontes localmente.

## Compatibilidade

Testado em build de produção nas resoluções desktop (1440px) e mobile (iPhone 13, 390px), com e sem `prefers-reduced-motion`. O bundle da cena 3D (~260KB gzip) é carregado separadamente do bundle principal (~74KB gzip) e só é baixado quando o hero começa a renderizar.
