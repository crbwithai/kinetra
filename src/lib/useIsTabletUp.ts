import { useEffect, useState } from 'react'

const QUERY = '(min-width: 48rem)'

export function useIsTabletUp() {
  const [isTabletUp, setIsTabletUp] = useState(() => window.matchMedia(QUERY).matches)

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const handleChange = (event: MediaQueryListEvent) => setIsTabletUp(event.matches)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  return isTabletUp
}
