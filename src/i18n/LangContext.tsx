import { createContext, useContext } from 'react'
import type { Lang } from './pages'

interface LangContextValue {
  lang: Lang
  t: (key: string) => string
}

export const LangContext = createContext<LangContextValue | null>(null)

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) {
    throw new Error('useLang(), LangContext.Provider dışında çağrıldı')
  }
  return ctx
}
