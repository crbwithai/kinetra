import { Outlet } from 'react-router'
import { LangContext } from '../i18n/LangContext'
import type { Lang } from '../i18n/pages'
import { translate } from '../i18n/translate'

export default function LangLayout({ lang }: { lang: Lang }) {
  const value = { lang, t: (key: string) => translate(lang, key) }
  return (
    <LangContext.Provider value={value}>
      <Outlet />
    </LangContext.Provider>
  )
}
