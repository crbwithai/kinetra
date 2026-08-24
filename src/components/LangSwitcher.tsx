import { Link, useLocation } from 'react-router'
import { useLang } from '../i18n/LangContext'
import { LANGS, matchPage, pagePath } from '../i18n/pages'

// Geçici/tasarımsız — çalıştığını test etmek için var. Tasarım sonra gelecek.
export default function LangSwitcher() {
  const { lang, t } = useLang()
  const location = useLocation()
  const otherLang = LANGS.find((l) => l !== lang)!

  const restPath = location.pathname.split('/').slice(2).join('/')
  const page = matchPage(lang, restPath)
  const href = page ? pagePath(page, otherLang) : `/${otherLang}`

  return (
    <Link to={href} className="text-label uppercase">
      {t('nav.langSwitch')}
    </Link>
  )
}
