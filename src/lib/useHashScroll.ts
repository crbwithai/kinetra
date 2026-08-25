import { useEffect } from 'react'
import { useLocation } from 'react-router'

// React Router'ın <Link>'i URL'i (hash dahil) günceller ama tarayıcının doğal
// "#id'ye kaydır" davranışını SPA navigasyonunda tetiklemez — bunu elle yapıyoruz.
export function useHashScroll() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = decodeURIComponent(location.hash.slice(1))
    const target = document.getElementById(id)
    if (!target) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
  }, [location.pathname, location.hash])
}
