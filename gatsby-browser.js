import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// ES5 way
// exports.onClientEntry = () => {
// ES6 way
export const onClientEntry = () => {
    // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
    if (typeof window.IntersectionObserver === `undefined`) {
        require(`intersection-observer`)
        console.log(`# IntersectionObserver is polyfilled!`)
    }

    if (typeof window !== `undefined`) {
      gsap.registerPlugin(ScrollTrigger)
      gsap.core.globals("ScrollTrigger", ScrollTrigger)
    }
}
