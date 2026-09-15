import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'

let registered = false

/** Registers GSAP plugins exactly once, no matter how many components call it. */
export function registerGsap() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger, Flip, useGSAP)
  registered = true
}

registerGsap()

export { gsap, ScrollTrigger, Flip, useGSAP }
