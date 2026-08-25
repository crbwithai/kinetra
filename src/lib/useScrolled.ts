import { useEffect, useState } from 'react'

// Eşiği geçince true döner. State yalnızca sınırı geçerken değişir, her piksel için değil.
export function useScrolled(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold)

  useEffect(() => {
    function handleScroll() {
      setScrolled((prev) => {
        const next = window.scrollY > threshold
        return prev === next ? prev : next
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
