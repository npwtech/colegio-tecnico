import { useState } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { IntroReadyContext } from '@/lib/introContext'
import { Preloader } from '@/components/layout/Preloader'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Cursor } from '@/components/ui/Cursor'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Courses } from '@/components/sections/Courses'
import { Structure } from '@/components/sections/Structure'
import { Contact } from '@/components/sections/Contact'

function App() {
  useLenis()
  const [introReady, setIntroReady] = useState(false)

  return (
    <IntroReadyContext.Provider value={introReady}>
      <Cursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Courses />
        <Structure />
        <Contact />
      </main>
      <Footer />
      <Preloader onComplete={() => setIntroReady(true)} />
    </IntroReadyContext.Provider>
  )
}

export default App
