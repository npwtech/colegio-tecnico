import { createContext, useContext } from 'react'

/** True once the preloader curtain has lifted and it's safe for section
 * entrance timelines to play. */
export const IntroReadyContext = createContext(false)

export function useIntroReady() {
  return useContext(IntroReadyContext)
}
