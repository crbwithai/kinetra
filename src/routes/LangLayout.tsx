import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { LangContext } from '../i18n/LangContext'
import type { Lang } from '../i18n/pages'
import { translate } from '../i18n/translate'
import { useHashScroll } from '../lib/useHashScroll'

export default function LangLayout({ lang }: { lang: Lang }) {
  const value = { lang, t: (key: string) => translate(lang, key) }
  useHashScroll()
  return (
    <LangContext.Provider value={value}>
      <div className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1 pt-2xl">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LangContext.Provider>
  )
}
