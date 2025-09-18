export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement) {
      // Respect reduced motion
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      const initialOpacity = el.style.opacity
      const initialTransform = el.style.transform
      const delay = el.getAttribute('data-reveal-delay') || '0ms'

      // Track scroll direction globally per element instance
      let lastY = window.scrollY
      let scrollDir: 'down' | 'up' = 'down'
      const onScroll = () => {
        const y = window.scrollY
        scrollDir = y > lastY ? 'down' : 'up'
        lastY = y
      }
      window.addEventListener('scroll', onScroll, { passive: true })

      const setHidden = () => {
        el.style.opacity = '0'
        el.style.transform = scrollDir === 'down' ? 'translateY(16px)' : 'translateY(-16px)'
      }
      const setShown = () => {
        el.style.opacity = initialOpacity || '1'
        el.style.transform = initialTransform || 'none'
      }

      // initial state hidden
      setHidden()
      el.style.transition = 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)'
      el.style.transitionDelay = delay

      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // restart animation based on current scroll direction
            el.style.transitionDelay = delay
            setHidden()
            // force reflow then animate to shown
            void el.offsetHeight
            setShown()
          } else {
            setHidden()
          }
        }
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 })

      ;(el as any)._revealObserver = observer
      ;(el as any)._revealScroll = onScroll
      observer.observe(el)
    },
    unmounted(el: HTMLElement) {
      const obs: IntersectionObserver | undefined = (el as any)._revealObserver
      if (obs) obs.disconnect()
      const onScroll: any = (el as any)._revealScroll
      if (onScroll) window.removeEventListener('scroll', onScroll as any)
    }
  })
})


